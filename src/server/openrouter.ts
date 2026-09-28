/**
 * Central Server-Side OpenRouter Service for MATHVERSE AI TUTOR
 *
 * Requirements:
 * - Uses OPENROUTER_API_KEY from process.env (never exposed to client)
 * - Central model configuration with OPENROUTER_MODEL (defaults to z-ai/glm-5.2:free)
 * - Strict free model guarantee: never silently charges or switches to paid models
 * - Handles missing key, invalid key, rate limits, model availability, network errors
 */

export const DEFAULT_OPENROUTER_MODEL = 'z-ai/glm-5.2:free';
export const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterStatus {
  configured: boolean;
  model: string;
  isPlaceholder: boolean;
  message?: string;
}

export class OpenRouterError extends Error {
  public status: number;
  public isConfigError: boolean;
  public isRateLimit: boolean;
  public isModelUnavailable: boolean;

  constructor(message: string, status = 500, flags?: { isConfigError?: boolean; isRateLimit?: boolean; isModelUnavailable?: boolean }) {
    super(message);
    this.name = 'OpenRouterError';
    this.status = status;
    this.isConfigError = flags?.isConfigError ?? false;
    this.isRateLimit = flags?.isRateLimit ?? false;
    this.isModelUnavailable = flags?.isModelUnavailable ?? false;
  }
}

/**
 * Returns the current OpenRouter API Key from environment
 */
export function getOpenRouterApiKey(): string {
  return (process.env.OPENROUTER_API_KEY || '').trim();
}

/**
 * Resolves any model name or display name to a valid OpenRouter model slug
 */
export function resolveOpenRouterModelId(rawModel?: string): string {
  if (!rawModel || !rawModel.trim()) {
    return DEFAULT_OPENROUTER_MODEL;
  }
  const clean = rawModel.trim();
  const lower = clean.toLowerCase();

  // Known display names or shorthand aliases
  if (lower.includes('ling 3.0 flash sante') || lower.includes('ling-3.0-flash-sante')) {
    return 'inclusionai/ling-3.0-flash-sante:free';
  }
  if (lower.includes('ling 3.0 flash fin') || lower.includes('ling-3.0-flash-fin')) {
    return 'inclusionai/ling-3.0-flash-fin:free';
  }
  if (lower.includes('glm-4-9b-chat') || lower.includes('glm 4 9b') || lower.includes('glm-4')) {
    return 'thudm/glm-4-9b-chat:free';
  }
  if (lower.includes('gemini-flash-1.5') || lower.includes('gemini 1.5 flash')) {
    return 'google/gemini-flash-1.5';
  }
  if (lower.includes('glm-5.2') || lower.includes('glm 5.2') || lower === 'glm') {
    return 'z-ai/glm-5.2:free';
  }

  // If already a valid slug like owner/model or owner/model:free
  if (/^[a-z0-9_-]+\/[a-z0-9_.-]+(:[a-z0-9_.-]+)?$/i.test(clean)) {
    return clean;
  }

  // If display name with colon like "Brand: Model (free)"
  const isFree = lower.includes('(free)') || lower.endsWith(':free');
  const withoutFree = clean.replace(/\(free\)/i, '').trim();
  if (withoutFree.includes(':')) {
    const [brandPart, ...rest] = withoutFree.split(':');
    const modelPart = rest.join(':').trim();
    const brandSlug = brandPart.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/--+/g, '-');
    const modelSlug = modelPart.toLowerCase().replace(/[^a-z0-9_.-]/g, '-').replace(/--+/g, '-').replace(/^-|-$/g, '');
    return `${brandSlug}/${modelSlug}${isFree ? ':free' : ''}`;
  }

  return DEFAULT_OPENROUTER_MODEL;
}

/**
 * Returns the current configured model ID from environment or default free GLM model
 */
export function getOpenRouterModel(): string {
  const model = (process.env.OPENROUTER_MODEL || '').trim();
  return resolveOpenRouterModelId(model);
}

/**
 * Checks if a valid non-placeholder API key is set
 */
export function isOpenRouterConfigured(): boolean {
  const key = getOpenRouterApiKey();
  if (!key) return false;
  if (key === 'PASTE_YOUR_OPENROUTER_API_KEY_HERE') return false;
  if (key === 'MY_OPENROUTER_API_KEY') return false;
  return key.length > 5;
}

/**
 * Returns a safe status summary for the client (never exposing the key)
 */
export function getOpenRouterStatus(): OpenRouterStatus {
  const key = getOpenRouterApiKey();
  const model = getOpenRouterModel();
  const isPlaceholder = key === 'PASTE_YOUR_OPENROUTER_API_KEY_HERE' || key === 'MY_OPENROUTER_API_KEY';
  const configured = Boolean(key && !isPlaceholder && key.length > 5);

  return {
    configured,
    model,
    isPlaceholder,
    message: configured
      ? `Connected to OpenRouter using ${model}`
      : 'AI Tutor is not configured yet. Please add your OpenRouter API key to the project\'s .env file.',
  };
}

/**
 * Builds the comprehensive pedagogical system prompt for MATHVERSE AI TUTOR
 */
export function buildSystemPrompt(studentClass: number = 10, studentName: string = 'Student'): string {
  return `You are "AI TUTOR", a dedicated, patient, and highly articulate mathematics tutor for Indian CBSE/NCERT Class ${studentClass} students following the 2026–27 curriculum.
The student's name is ${studentName || 'Student'}. Always personalize your explanations to them.

CRITICAL FORMATTING INSTRUCTIONS (STRICT):
1. Do NOT use markdown formatting:
   - NEVER use asterisks (* or **) for bolding, italics, emphasis, or bullet points.
   - NEVER use hashtag/pound symbols (#, ##, ###) for headers or titles.
2. Structure all explanations using ONLY:
   - Plain text with standard line breaks
   - Numbered steps (1., 2., 3., 4.) or uppercase keywords (e.g. GIVEN:, FORMULA:, STEP 1:, SOLUTION:, FINAL ANSWER:)
   - LaTeX notation for equations: $inline$ for inline math (e.g. $x^2 + 5x + 6 = 0$), and $$block$$ on a separate line for display equations.
3. EMPHASIS & BOLDING:
   - When emphasizing important words, step labels, or definitions, use HTML tags: <b>emphasized text</b> (e.g. <b>Step 1:</b> or <b>Key Theorem:</b>).
   - Alternatively, write key terms in CAPITAL LETTERS.
   - NEVER output * or ** for emphasis.

Core pedagogical principles:
1. Genuine Conversation: Maintain natural conversational continuity. Refer back to previous problems and queries in the conversation history.
2. Step-by-Step Clarity: Always explain WHY each step is performed, not just mechanical algebra.
3. Class-Appropriate Language: Adapt depth, vocabulary, and methods strictly to CBSE Class ${studentClass} syllabus standards.
4. Error Identification & Correction: When the student shares their work or asks "Check my solution", pinpoint the exact arithmetic or logical slip gently, explain the underlying mathematical principle, and demonstrate how to solve it correctly.
5. Clarifying Questions: If a question is ambiguous or missing necessary values, ask a polite clarifying question.
6. Formula Discipline: Highlight key formulas, explain the meaning of each variable, specify units and conditions, and provide an exam tip where helpful.
7. Tone: Confident, encouraging, intellectual, and friendly. Avoid robotic filler phrases.`;
}

/**
 * Normalizes input messages and system prompts for OpenRouter GLM model
 */
export function formatTutorMessages(options: {
  message?: string;
  action?: string;
  history?: Array<{ role?: string; sender?: string; content?: string; text?: string }>;
  studentClass?: number | string;
  studentName?: string;
  topic?: string;
}): OpenRouterMessage[] {
  const {
    message = '',
    action = '',
    history = [],
    studentClass = 10,
    studentName = 'Student',
  } = options;

  const parsedClass = typeof studentClass === 'string' ? parseInt(studentClass, 10) || 10 : studentClass;
  const systemPrompt = buildSystemPrompt(parsedClass, studentName);

  let userPrompt = message.trim();

  if (action === 'explain_simpler' || action === 'simplify') {
    userPrompt = userPrompt
      ? `Explain this in simpler terms with an everyday intuition and zero confusing jargon for Class ${parsedClass}: "${userPrompt}"`
      : `Can you explain the current mathematical topic in simpler terms with an everyday analogy?`;
  } else if (action === 'give_example' || action === 'example') {
    userPrompt = userPrompt
      ? `Provide a step-by-step solved example for this concept: "${userPrompt}" appropriate for CBSE Class ${parsedClass}.`
      : `Can you show me a clear step-by-step solved example for this concept?`;
  } else if (action === 'show_another_method' || action === 'another_method') {
    userPrompt = userPrompt
      ? `Show an alternative method, geometric visualization, or verification check to solve: "${userPrompt}".`
      : `Is there an alternative method or check to solve this problem?`;
  } else if (action === 'give_practice' || action === 'practice') {
    userPrompt = userPrompt
      ? `Give me 2-3 graded practice questions with hints based on: "${userPrompt}" for Class ${parsedClass}.`
      : `Can you generate 2 practice questions at my class level to test my understanding?`;
  } else if (action === 'check_my_solution' || action === 'check_solution') {
    userPrompt = userPrompt
      ? `Please check my solution, identify any mistakes or step omissions, and guide me on how to fix it: "${userPrompt}"`
      : `Here is my solution. Could you review it and point out if I made any mistakes?`;
  }

  const formatted: OpenRouterMessage[] = [
    { role: 'system', content: systemPrompt },
  ];

  if (Array.isArray(history) && history.length > 0) {
    const recent = history.slice(-12);
    for (const h of recent) {
      const text = (h.content || h.text || '').trim();
      if (!text) continue;
      const roleStr = (h.role || (h.sender === 'user' ? 'user' : 'assistant')).toLowerCase();
      const role: 'user' | 'assistant' = roleStr === 'assistant' || roleStr === 'model' || roleStr === 'tutor'
        ? 'assistant'
        : 'user';

      const last = formatted[formatted.length - 1];
      if (last && last.role === role) {
        last.content += `\n\n${text}`;
      } else {
        formatted.push({ role, content: text });
      }
    }
  }

  if (userPrompt) {
    const last = formatted[formatted.length - 1];
    if (last && last.role === 'user') {
      last.content += `\n\n${userPrompt}`;
    } else {
      formatted.push({ role: 'user', content: userPrompt });
    }
  }

  return formatted;
}

/**
 * Executes a non-streaming chat completion with OpenRouter using the GLM model
 */
export async function sendOpenRouterChat(messages: OpenRouterMessage[]): Promise<string> {
  if (!isOpenRouterConfigured()) {
    throw new OpenRouterError(
      'AI Tutor is not configured yet. Please add your OpenRouter API key to the project\'s .env file.',
      401,
      { isConfigError: true }
    );
  }

  const apiKey = getOpenRouterApiKey();
  const model = getOpenRouterModel();
  const appUrl = process.env.APP_URL || 'http://localhost:3000';

  let response: Response;
  try {
    response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': appUrl,
        'X-Title': 'MATHVERSE AI Tutor',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
      }),
    });
  } catch (netErr: any) {
    throw new OpenRouterError(
      `Network error connecting to OpenRouter: ${netErr.message || 'Unable to reach openrouter.ai'}`,
      503
    );
  }

  if (!response.ok) {
    const errorBody = await response.text();
    let parsedMessage = '';
    try {
      const parsed = JSON.parse(errorBody);
      parsedMessage = parsed.error?.message || parsed.message || '';
    } catch {
      parsedMessage = errorBody;
    }

    if (response.status === 401) {
      throw new OpenRouterError(
        'Invalid OpenRouter API key. Please check your OPENROUTER_API_KEY in the .env file.',
        401,
        { isConfigError: true }
      );
    } else if (response.status === 402) {
      throw new OpenRouterError(
        `OpenRouter payment error: The model "${model}" requires credits or is unavailable. Please verify OPENROUTER_MODEL is set to a free model (e.g. z-ai/glm-5.2:free).`,
        402,
        { isModelUnavailable: true }
      );
    } else if (response.status === 429) {
      throw new OpenRouterError(
        'OpenRouter rate limit reached for the free GLM model. Please wait a moment and try again.',
        429,
        { isRateLimit: true }
      );
    } else if (response.status === 503 || response.status === 502) {
      throw new OpenRouterError(
        `The GLM model "${model}" is temporarily busy or unavailable on OpenRouter. Please try again in a few moments.`,
        response.status,
        { isModelUnavailable: true }
      );
    } else if (response.status === 404) {
      throw new OpenRouterError(
        `The model "${model}" was not found on OpenRouter. Please verify OPENROUTER_MODEL in your .env file.`,
        404,
        { isModelUnavailable: true }
      );
    } else {
      throw new OpenRouterError(
        parsedMessage || `OpenRouter API error (HTTP ${response.status})`,
        response.status
      );
    }
  }

  const data = await response.json();
  const choice = data.choices?.[0];
  const content = choice?.message?.content;

  if (!content || typeof content !== 'string' || !content.trim()) {
    throw new OpenRouterError('OpenRouter returned an empty response. Please retry your question.', 500);
  }

  return content.trim();
}

/**
 * Initiates an SSE streaming response from OpenRouter
 */
export async function streamOpenRouterChat(
  messages: OpenRouterMessage[],
  onChunk: (textChunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  if (!isOpenRouterConfigured()) {
    throw new OpenRouterError(
      'AI Tutor is not configured yet. Please add your OpenRouter API key to the project\'s .env file.',
      401,
      { isConfigError: true }
    );
  }

  const apiKey = getOpenRouterApiKey();
  const model = getOpenRouterModel();
  const appUrl = process.env.APP_URL || 'http://localhost:3000';

  let response: Response;
  try {
    response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': appUrl,
        'X-Title': 'MATHVERSE AI Tutor',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        stream: true,
      }),
      signal,
    });
  } catch (netErr: any) {
    throw new OpenRouterError(
      `Network error connecting to OpenRouter: ${netErr.message || 'Unable to reach openrouter.ai'}`,
      503
    );
  }

  if (!response.ok) {
    const errorBody = await response.text();
    let parsedMessage = '';
    try {
      const parsed = JSON.parse(errorBody);
      parsedMessage = parsed.error?.message || parsed.message || '';
    } catch {
      parsedMessage = errorBody;
    }

    if (response.status === 401) {
      throw new OpenRouterError(
        'Invalid OpenRouter API key. Please check your OPENROUTER_API_KEY in the .env file.',
        401,
        { isConfigError: true }
      );
    } else if (response.status === 402) {
      throw new OpenRouterError(
        `OpenRouter payment error: The model "${model}" requires credits. Please check OPENROUTER_MODEL in .env is set to a free model (e.g. z-ai/glm-5.2:free).`,
        402,
        { isModelUnavailable: true }
      );
    } else if (response.status === 429) {
      throw new OpenRouterError(
        'OpenRouter rate limit reached for the free GLM model. Please wait a moment and try again.',
        429,
        { isRateLimit: true }
      );
    } else if (response.status === 503 || response.status === 502) {
      throw new OpenRouterError(
        `The GLM model "${model}" is temporarily busy or unavailable on OpenRouter. Please try again in a few moments.`,
        response.status,
        { isModelUnavailable: true }
      );
    } else if (response.status === 404) {
      throw new OpenRouterError(
        `The model "${model}" was not found on OpenRouter. Please verify OPENROUTER_MODEL in your .env file.`,
        404,
        { isModelUnavailable: true }
      );
    } else {
      throw new OpenRouterError(
        parsedMessage || `OpenRouter API error (HTTP ${response.status})`,
        response.status
      );
    }
  }

  if (!response.body) {
    throw new OpenRouterError('OpenRouter streaming body is empty.', 500);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let receivedAnyText = false;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(':')) continue;

        if (trimmed.startsWith('data:')) {
          const dataStr = trimmed.slice(5).trim();
          if (dataStr === '[DONE]') {
            return;
          }

          try {
            const parsed = JSON.parse(dataStr);
            const deltaContent = parsed.choices?.[0]?.delta?.content;
            if (deltaContent) {
              receivedAnyText = true;
              onChunk(deltaContent);
            }
          } catch {
            // Ignore non-json lines or heartbeats
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (!receivedAnyText) {
    throw new OpenRouterError('OpenRouter returned an empty stream. Please retry your question.', 500);
  }
}
