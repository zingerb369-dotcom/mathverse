import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MathRenderer } from '../common/MathRenderer';
import {
  loadTutorSessions,
  saveTutorSessions,
  SavedTutorSession,
} from '../../utils/storage';
import {
  Bot,
  Send,
  RotateCcw,
  Copy,
  Check,
  Lightbulb,
  AlertCircle,
  RefreshCw,
  Cpu,
  Key,
  ChevronDown,
  ChevronUp,
  History,
  Plus,
  Trash2,
  PanelRightClose,
  PanelRightOpen,
  Square,
  Pencil,
  X,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  time: string;
  isStreaming?: boolean;
  isError?: boolean;
  errorMessage?: string;
  modelUsed?: string;
  retryPayload?: { text?: string; actionType?: string };
}

interface OpenRouterStatus {
  configured: boolean;
  model: string;
  isPlaceholder: boolean;
  message?: string;
}

export const AiTutorView: React.FC = () => {
  const { profile, playSound, setCurrentView } = useApp();

  const [configStatus, setConfigStatus] = useState<OpenRouterStatus | null>(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [isCheckingConfig, setIsCheckingConfig] = useState(false);

  // Sessions and History state
  const [sessions, setSessions] = useState<SavedTutorSession[]>(() => {
    const loaded = loadTutorSessions();
    if (loaded && loaded.length > 0) return loaded;
    return [];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    return 'session_' + Date.now();
  });

  const initialWelcomeMessage: ChatMessage = {
    id: 'm_welcome',
    sender: 'tutor',
    text: `Hello ${profile.name || 'there'}! I am your AI TUTOR for CBSE Class ${profile.grade} Mathematics (2026–27 session).\n\nAsk any math question, homework problem, or theorem proof:\n- Step-by-step problem solutions and derivations\n- Concept explanations with everyday analogies\n- Error checking: Send your working steps to check for mistakes\n- Alternative solving methods, shortcuts, and verification\n- CBSE Board exam formulas, proofs, and high-yield questions\n\nWhat would you like to explore or solve together?`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcomeMessage]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Companion Right Sidebar state (Chat History only)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  // Edit previous user prompt state (like Gemini)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Fetch OpenRouter backend config status
  const checkStatus = async () => {
    setIsCheckingConfig(true);
    try {
      const res = await fetch('/api/ai/status');
      if (res.ok) {
        const data: OpenRouterStatus = await res.json();
        setConfigStatus(data);
      }
    } catch (e) {
      console.warn('Failed to check OpenRouter status:', e);
    } finally {
      setIsCheckingConfig(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Sync current messages to sessions state and localStorage whenever messages update
  useEffect(() => {
    if (messages.length <= 1) return;

    // Find first user message for a meaningful session title
    const firstUserMsg = messages.find(m => m.sender === 'user');
    const title = firstUserMsg
      ? firstUserMsg.text.slice(0, 45).trim() + (firstUserMsg.text.length > 45 ? '...' : '')
      : `Class ${profile.grade} Math Session`;

    const updatedSession: SavedTutorSession = {
      id: currentSessionId,
      title,
      date: new Date().toISOString(),
      grade: profile.grade,
      messages: messages.map(m => ({
        id: m.id,
        sender: m.sender,
        text: m.text,
        time: m.time,
        isError: m.isError,
        errorMessage: m.errorMessage,
      })),
    };

    setSessions(prev => {
      const existingIdx = prev.findIndex(s => s.id === currentSessionId);
      let nextSessions: SavedTutorSession[];
      if (existingIdx >= 0) {
        nextSessions = [...prev];
        nextSessions[existingIdx] = updatedSession;
      } else {
        nextSessions = [updatedSession, ...prev];
      }
      saveTutorSessions(nextSessions);
      return nextSessions;
    });
  }, [messages, currentSessionId, profile.grade]);

  // Switch to a previous chat session from history
  const handleLoadSession = (session: SavedTutorSession) => {
    playSound('click');
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    if (window.innerWidth < 1024) {
      setIsRightPanelOpen(false);
    }
  };

  // Start fresh math explanation session
  const handleStartFreshSession = () => {
    playSound('click');
    const newId = 'session_' + Date.now();
    setCurrentSessionId(newId);
    setMessages([
      {
        id: 'm_fresh_' + Date.now(),
        sender: 'tutor',
        text: `Fresh math session started for ${profile.name || 'Student'}! How can I assist you with Class ${profile.grade} Mathematics?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Delete a session from history
  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    setSessions(prev => {
      const next = prev.filter(s => s.id !== sessionId);
      saveTutorSessions(next);
      return next;
    });
    if (currentSessionId === sessionId) {
      handleStartFreshSession();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    playSound('click');
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setMessages(prev =>
      prev.map(m => (m.isStreaming ? { ...m, isStreaming: false, text: m.text || 'Generation stopped.' } : m))
    );
    playSound('click');
  };

  const handleEditSubmit = (msgId: string) => {
    if (!editingText.trim()) return;
    const msgIdx = messages.findIndex(m => m.id === msgId);
    if (msgIdx === -1) return;

    // Truncate messages to just before this edited message, then resend
    const historyBefore = messages.slice(0, msgIdx);
    const newText = editingText.trim();
    setEditingMessageId(null);
    setEditingText('');
    sendMessage(newText, undefined, historyBefore);
  };

  const sendMessage = async (
    textToSend?: string,
    actionType?: string,
    baseMessages?: ChatMessage[]
  ) => {
    const text = textToSend !== undefined ? textToSend.trim() : inputText.trim();
    if (!text && !actionType) return;

    // Abort any ongoing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    let displayText =
      text ||
      (actionType === 'explain_simpler'
        ? 'Explain this more simply'
        : actionType === 'explain_differently'
        ? 'Explain with a different approach'
        : actionType === 'give_example'
        ? 'Give me another example'
        : actionType === 'show_another_method'
        ? 'Show another method'
        : actionType === 'give_practice'
        ? 'Give practice questions'
        : actionType === 'check_my_solution'
        ? 'Check my solution'
        : actionType === 'formula_explanation'
        ? 'Explain formula in detail'
        : `Action: ${actionType}`);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = 'msg_user_' + Date.now();
    const tutorMsgId = 'msg_tutor_' + (Date.now() + 1);

    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: displayText,
      time: now,
    };

    const tutorMsgPlaceholder: ChatMessage = {
      id: tutorMsgId,
      sender: 'tutor',
      text: '',
      time: now,
      isStreaming: true,
      retryPayload: { text: textToSend !== undefined ? textToSend : inputText, actionType },
    };

    const currentBase = baseMessages !== undefined ? baseMessages : messages;
    const updatedMessages = [...currentBase, userMsg];
    setMessages([...updatedMessages, tutorMsgPlaceholder]);
    if (textToSend === undefined) setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = updatedMessages
        .filter(m => !m.isError && m.text.trim())
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));

      const res = await fetch('/api/tutor/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          studentName: profile.name,
          studentClass: profile.grade,
          action: actionType || '',
        }),
      });

      if (!res.ok) {
        let errMessage = `Request failed (HTTP ${res.status})`;
        try {
          const errData = await res.json();
          if (errData.error) errMessage = errData.error;
        } catch {
          // Keep default
        }
        throw new Error(errMessage);
      }

      if (!res.body) {
        throw new Error('No response received from the server.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';
      let streamError: string | null = null;
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data:')) {
            const dataStr = trimmed.slice(5).trim();
            if (dataStr === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.error) {
                streamError = parsed.error;
                break;
              }
              if (parsed.text) {
                accumulatedText += parsed.text;
                setMessages(prev =>
                  prev.map(m =>
                    m.id === tutorMsgId
                      ? {
                          ...m,
                          text: accumulatedText,
                          isStreaming: true,
                        }
                      : m
                  )
                );
              }
            } catch {
              // Skip non-json line
            }
          }
        }

        if (streamError) break;
      }

      if (streamError) throw new Error(streamError);
      if (!accumulatedText.trim()) {
        throw new Error('OpenRouter returned an empty response. Please retry your question.');
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === tutorMsgId
            ? {
                ...m,
                text: accumulatedText,
                isStreaming: false,
                isError: false,
              }
            : m
        )
      );
      playSound('correct');
    } catch (err: any) {
      if (err.name === 'AbortError' || controller.signal.aborted) {
        // User pressed stop button - finalize cleanly
        setMessages(prev =>
          prev.map(m =>
            m.id === tutorMsgId
              ? {
                  ...m,
                  isStreaming: false,
                  text: m.text || 'Response stopped by user.',
                }
              : m
          )
        );
        return;
      }

      console.warn('AI Tutor error:', err);
      playSound('incorrect');

      const rawError = err?.message || 'An error occurred while contacting OpenRouter.';
      setMessages(prev =>
        prev.map(m =>
          m.id === tutorMsgId
            ? {
                ...m,
                text: '',
                isStreaming: false,
                isError: true,
                errorMessage: rawError,
                retryPayload: { text, actionType },
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  };

  const handleRetry = (msg: ChatMessage) => {
    if (!msg.retryPayload) return;
    const { text, actionType } = msg.retryPayload;
    setMessages(prev => prev.filter(m => m.id !== msg.id));
    sendMessage(text, actionType);
  };

  const quickActions = [
    { id: 'explain_simpler', label: 'Explain simply', action: 'explain_simpler' },
    { id: 'explain_differently', label: 'Alternative angle', action: 'explain_differently' },
    { id: 'give_example', label: 'Step-by-step example', action: 'give_example' },
    { id: 'show_another_method', label: 'Shortcuts & tricks', action: 'show_another_method' },
    { id: 'check_my_solution', label: 'Check my steps', action: 'check_my_solution' },
    { id: 'give_practice', label: 'Board practice problem', action: 'give_practice' },
    { id: 'formula_explanation', label: 'Formula breakdown', action: 'formula_explanation' },
  ];

  const suggestedPrompts = [
    `Explain the concept of ${profile.grade === 10 ? 'Fundamental Theorem of Arithmetic and Real Numbers' : profile.grade === 9 ? 'Irrational numbers and number line' : 'Fractions and decimals'} with a real-life analogy.`,
    `Give me a step-by-step solved CBSE Board exam problem with full working steps.`,
    `What are the most common calculation mistakes in Class ${profile.grade} mathematics?`,
    `Derive the formula for ${profile.grade === 10 ? 'Quadratic Formula roots: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$' : profile.grade === 9 ? 'Heron\'s formula for triangle area' : 'Perimeter and area of composite shapes'}.`,
  ];

  const isConfigured = configStatus?.configured === true;

  return (
    <div className="flex-1 flex w-full h-full min-h-0 overflow-hidden gap-3 animate-in fade-in duration-150">
      {/* ========================================================
          LEFT/CENTER AREA: THE BIG CHAT SPACE
         ======================================================== */}
      <div className="flex-1 min-w-0 flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs relative">
        {/* Tutor Top Bar */}
        <div className="p-3 sm:p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center font-bold shadow-xs shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-bold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-zinc-100">
                  Math AI Tutor
                </h1>
                {isConfigured ? (
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    OpenRouter · {configStatus?.model || 'GLM Model'}
                  </span>
                ) : (
                  <button
                    onClick={() => setShowSetupGuide(!showSetupGuide)}
                    className="text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60 flex items-center gap-1 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    OpenRouter Key Setup
                  </button>
                )}
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-medium border border-zinc-200 dark:border-zinc-700">
                  <Cpu className="w-2.5 h-2.5 text-zinc-500" />
                  Free GLM Model
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                Class {profile.grade} CBSE/NCERT Conversational Mathematics Workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Start Fresh Explanation Session */}
            <button
              onClick={handleStartFreshSession}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium transition-colors cursor-pointer"
              title="Start a new math explanation thread"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Thread</span>
            </button>

            {/* Refresh server configuration */}
            <button
              onClick={checkStatus}
              disabled={isCheckingConfig}
              className="p-1.5 sm:p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Check OpenRouter configuration"
            >
              <RefreshCw className={`w-4 h-4 ${isCheckingConfig ? 'animate-spin' : ''}`} />
            </button>

            {/* Chat History Panel Toggle */}
            <button
              onClick={() => {
                playSound('click');
                setIsRightPanelOpen(prev => !prev);
              }}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isRightPanelOpen
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-100'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
              title={isRightPanelOpen ? 'Close chat history panel for full space' : 'Open chat history panel'}
            >
              {isRightPanelOpen ? (
                <PanelRightClose className="w-4 h-4" />
              ) : (
                <History className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isRightPanelOpen ? 'Close History' : `History (${sessions.length})`}
              </span>
            </button>
          </div>
        </div>

        {/* Missing Key Warning / Setup Banner */}
        {!isConfigured && configStatus !== null && (
          <div className="border-b border-amber-200/80 dark:border-amber-900/50 bg-amber-50/90 dark:bg-amber-950/40 p-3 sm:px-5 shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Key className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                    AI Tutor is not configured yet. Please add your OpenRouter API key to the project&apos;s .env file.
                  </p>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                    MATHVERSE connects to free models via OpenRouter (e.g. <code className="font-mono text-[10px] bg-amber-100 dark:bg-amber-900/80 px-1 py-0.5 rounded">{configStatus.model}</code>).
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSetupGuide(!showSetupGuide)}
                className="text-xs font-medium text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
              >
                {showSetupGuide ? 'Hide Guide' : 'Setup Guide'}
                {showSetupGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showSetupGuide && (
              <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
                <p className="font-medium">Quick setup instructions:</p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-amber-800 dark:text-amber-300">
                  <li>Visit <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline font-semibold">openrouter.ai/keys</a> and copy your free key.</li>
                  <li>In project root, set <code className="bg-amber-100 dark:bg-amber-900/60 px-1 rounded font-mono">OPENROUTER_API_KEY=YOUR_KEY</code> in <code className="bg-amber-100 dark:bg-amber-900/60 px-1 rounded font-mono">.env</code>.</li>
                  <li>Click the refresh icon above to reconnect instantly.</li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            MESSAGES SCROLL AREA WITH VIVID TEXT SELECTION
           ======================================================== */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0 select-text"
        >
          {messages.map(msg => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-3xl ${
                  isUser ? 'ml-auto' : 'mr-auto'
                } group select-text`}
              >
                {/* Message Header with Sender Name & Copy Button */}
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                    {isUser ? profile.name || 'You' : 'AI TUTOR'} · {msg.time}
                  </span>
                  {msg.text && !msg.isError && (
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      className="opacity-70 group-hover:opacity-100 transition-opacity p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      title="Copy text to clipboard"
                    >
                      {copiedId === msg.id ? (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                          <Check className="w-3 h-3 text-emerald-500" /> Copied
                        </span>
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>

                {/* User Message Inline Edit Mode (like Gemini) */}
                {isUser && editingMessageId === msg.id ? (
                  <div className="w-full min-w-[280px] sm:min-w-[420px] max-w-2xl p-3 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-950 border border-zinc-700 dark:border-zinc-800 shadow-md space-y-2.5">
                    <textarea
                      value={editingText}
                      onChange={e => setEditingText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleEditSubmit(msg.id);
                        }
                      }}
                      rows={3}
                      autoFocus
                      className="w-full p-2.5 rounded-xl bg-zinc-800 text-white dark:bg-zinc-900 border border-zinc-700 text-xs sm:text-sm focus:outline-none focus:border-blue-500 resize-none"
                      placeholder="Edit your message..."
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingMessageId(null);
                          setEditingText('');
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEditSubmit(msg.id)}
                        disabled={!editingText.trim() || isLoading}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-colors cursor-pointer disabled:opacity-40"
                      >
                        Update & Ask
                      </button>
                    </div>
                  </div>
                ) : msg.isError ? (
                  <div className="p-4 rounded-2xl rounded-tl-xs text-xs sm:text-sm leading-relaxed bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200 shadow-xs max-w-xl select-text">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-xs text-red-900 dark:text-red-200">
                          Tutoring Request Failed
                        </p>
                        <p className="mt-1 text-xs text-red-800 dark:text-red-300">
                          {msg.errorMessage || 'Unable to communicate with OpenRouter.'}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => handleRetry(msg)}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium cursor-pointer shadow-xs disabled:opacity-50 transition-colors"
                          >
                            <RefreshCw className="w-3 h-3" />
                            Retry Question
                          </button>
                          {!isConfigured && (
                            <button
                              onClick={() => setShowSetupGuide(true)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer transition-colors"
                            >
                              Setup Instructions
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed transition-colors shadow-xs select-text cursor-text selection:bg-blue-600 selection:text-white dark:selection:bg-blue-500 dark:selection:text-white ${
                        isUser
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-tr-xs font-medium'
                          : 'bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-xs'
                      }`}
                    >
                      {msg.text ? (
                        <MathRenderer text={msg.text} />
                      ) : msg.isStreaming ? (
                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                          <span>GLM reasoning step-by-step for Class {profile.grade}...</span>
                        </div>
                      ) : null}

                      {/* Subtle streaming cursor */}
                      {msg.isStreaming && msg.text && (
                        <span className="inline-block w-1.5 h-3 ml-1 bg-blue-600 dark:bg-blue-400 animate-pulse align-middle" />
                      )}
                    </div>

                    {/* Action buttons under user bubble (like Gemini - Copy and Pencil icons) */}
                    {isUser && msg.text && (
                      <div className="flex items-center justify-end gap-1.5 mt-1 px-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Copy message text"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            playSound('click');
                            setEditingMessageId(msg.id);
                            setEditingText(msg.text);
                          }}
                          className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Edit message (like Gemini)"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested prompts if only initial welcome message */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/20 shrink-0">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 dark:text-zinc-500 mb-1.5">
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span>Suggested math topics for Class {profile.grade}:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer text-left line-clamp-1"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Action Pill Bar */}
        <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 overflow-x-auto flex items-center gap-2 shrink-0 scrollbar-none">
          <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 shrink-0 uppercase tracking-wider">
            Quick Actions:
          </span>
          {quickActions.map(qa => (
            <button
              key={qa.id}
              disabled={isLoading}
              onClick={() => sendMessage(undefined, qa.action)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0 cursor-pointer disabled:opacity-50 shadow-2xs"
            >
              {qa.label}
            </button>
          ))}
        </div>

        {/* Input Form with Enter to Send and Shift+Enter for Newline */}
        <div className="p-3 sm:p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={inputText}
              disabled={isLoading}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={`Ask AI TUTOR anything about Class ${profile.grade} Mathematics... (Supports LaTeX $x^2$)`}
              className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors resize-none disabled:opacity-50"
            />

            {/* Stop Generation Button beside Send */}
            {isLoading && (
              <button
                type="button"
                onClick={stopGeneration}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0 animate-pulse"
                title="Stop generating response immediately"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Stop</span>
              </button>
            )}

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs shrink-0"
              title="Send question (Enter)"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ========================================================
          RIGHT COMPANION RAIL: CLASS 10 PREP, QUIZZES, FORMULA VAULT & CHAT HISTORY
         ======================================================== */}
      {isRightPanelOpen && (
        <div className="w-80 xl:w-96 flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs shrink-0 animate-in slide-in-from-right duration-200">
          {/* Right Rail Header */}
          <div className="p-3 sm:p-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/90 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                <History className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Chat History
                </h3>
                <span className="text-[10px] text-zinc-400">
                  {sessions.length} {sessions.length === 1 ? 'thread' : 'threads'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleStartFreshSession}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                title="Start a new math explanation thread"
              >
                <Plus className="w-3.5 h-3.5" /> New
              </button>

              {/* Close panel button for full chat space */}
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setIsRightPanelOpen(false);
                }}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Close history panel for full chat space"
              >
                <PanelRightClose className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* TAB 1: QUICK ACCESS PANELS (Class 10 Prep, Quizzes, Formula Library, NCERT) */}
          {rightPanelTab === 'tools' && (
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 min-h-0">
              {/* 1. Class 10th Board Exam Prep Card */}
              {profile.grade === 10 ? (
                <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" /> Class 10th Board Prep
                    </span>
                    <span className="text-[10px] font-medium text-blue-600/80 dark:text-blue-400/80">
                      80 Marks
                    </span>
                  </div>
                  <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    CBSE 2026–27 Board Blueprint & High-Yield Questions
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Official paper pattern: Standard vs Basic, Section A to E marking, 20 MCQs, and Case Studies.
                  </p>
                  <button
                    onClick={() => {
                      playSound('click');
                      setCurrentView('exam10');
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Launch Board Prep Panel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" /> Class 10th Board Prep
                    </span>
                  </div>
                  <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Preview CBSE Class 10 Board Curriculum
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Check weightage, past paper blueprints, and advanced problem sets.
                  </p>
                  <button
                    onClick={() => {
                      playSound('click');
                      setCurrentView('exam10');
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Explore Class 10th Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* 2. Quizzes & Tests Card */}
              <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> Diagnostic Quizzes
                  </span>
                  <span className="text-[10px] font-medium text-amber-600/80 dark:text-amber-400/80">
                    +XP & Badges
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  Timed Practice & Concept Mastery Tests
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Test your accuracy with immediate solution explanations and score reports.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playSound('click');
                      setCurrentView('quiz');
                    }}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Open Quizzes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      playSound('click');
                      setCurrentView('practice');
                    }}
                    className="py-1.5 px-3 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100/50 transition-colors cursor-pointer"
                  >
                    Practice
                  </button>
                </div>
              </div>

              {/* 3. Formula Library In-Rail Search Card */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <Sigma className="w-3.5 h-3.5" /> Formula Library
                  </span>
                  <button
                    onClick={() => {
                      playSound('click');
                      setCurrentView('formulas');
                    }}
                    className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold hover:underline cursor-pointer"
                  >
                    View All →
                  </button>
                </div>

                {/* Instant formula lookup */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formulaSearchQuery}
                    onChange={e => setFormulaSearchQuery(e.target.value)}
                    placeholder="Search formula (e.g. Pythagoras, quadratic)..."
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-purple-400"
                  />
                </div>

                {/* Formula Mini Previews */}
                <div className="space-y-1.5">
                  {matchingFormulas.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        playSound('click');
                        sendMessage(`Can you explain this formula and show an example problem: ${item.title} ($${item.formulaLatex}$)?`);
                      }}
                      className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-left hover:border-purple-300 dark:hover:border-purple-700 transition-colors cursor-pointer group"
                      title="Click to ask AI Tutor to explain this formula"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                          {item.title}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-zinc-400">
                          Ask Tutor ↗
                        </span>
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-purple-700 dark:text-purple-300 truncate">
                        ${item.formulaLatex}$
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. NCERT Solutions & Bookmarks Quick Links */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    playSound('click');
                    setCurrentView('ncert');
                  }}
                  className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left cursor-pointer space-y-1"
                >
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    NCERT Books
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    Official PDFs & Exercises
                  </div>
                </button>

                <button
                  onClick={() => {
                    playSound('click');
                    setCurrentView('bookmarks');
                  }}
                  className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left cursor-pointer space-y-1"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Saved Vault
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    Formulas & Key Questions
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CHAT SESSIONS & EXPLANATIONS HISTORY */}
          {rightPanelTab === 'history' && (
            <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 min-h-0">
              <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-semibold uppercase text-zinc-400 tracking-wider">
                  Previous Math Explanations
                </span>
                <button
                  onClick={handleStartFreshSession}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> New
                </button>
              </div>

              {sessions.length === 0 ? (
                <div className="text-center py-8 px-4 text-zinc-400 dark:text-zinc-500 space-y-2">
                  <History className="w-8 h-8 mx-auto stroke-1" />
                  <p className="text-xs font-medium">No previous sessions saved yet</p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    As you ask math questions, your explanations and chat history will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {sessions.map(s => {
                    const isCurrent = s.id === currentSessionId;
                    const sessionDate = new Date(s.date).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                    });
                    const msgCount = s.messages.length;
                    return (
                      <div
                        key={s.id}
                        onClick={() => handleLoadSession(s)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer group relative ${
                          isCurrent
                            ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 shadow-xs'
                            : 'bg-zinc-50 dark:bg-zinc-950/60 border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-tight">
                            {s.title}
                          </h4>
                          <button
                            onClick={e => handleDeleteSession(s.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-500 transition-opacity cursor-pointer shrink-0"
                            title="Delete this history thread"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 mt-2">
                          <span>Class {s.grade} · {msgCount} messages</span>
                          <span>{sessionDate}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};