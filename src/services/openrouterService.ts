export interface ChatMessagePayload {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterConfig {
  apiKey?: string;
  model?: string;
  fallbackModel?: string;
  appUrl?: string;
}

/**
 * Standard System Prompt preventing markdown abuse (* and #)
 * Mandates plain text, line breaks, LaTeX for equations, and HTML <b> for bolding
 */
export const DEFAULT_MATH_TUTOR_SYSTEM_PROMPT = `You are a dedicated CBSE/NCERT mathematics tutor.
IMPORTANT FORMATTING RULES:
1. Do NOT use markdown formatting:
   - NEVER use asterisks (* or **) for bolding, italics, emphasis, or bullet points.
   - NEVER use hashtag/pound symbols (#, ##, ###) for headers or section titles.
2. Format all mathematical solutions and responses using ONLY:
   - Plain text with clean line breaks
   - Numbered steps (1., 2., 3., 4.) or uppercase keywords (e.g. GIVEN:, FORMULA:, STEP 1:, SOLUTION:, FINAL ANSWER:)
   - LaTeX notation for mathematical equations:
     * Inline math must use single dollar signs: $inline$ (e.g. $x^2 + 5x + 6 = 0$)
     * Block / display formulas must use double dollar signs on their own line: $$block$$ (e.g. $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$)
3. EMPHASIZING / BOLDING TEXT:
   - When emphasizing important words, step titles, or terms, use HTML bold tags: <b>bold text</b> (e.g. <b>Step 1:</b> or <b>Important Property:</b>).
   - Alternatively, write key keywords in CAPITAL LETTERS.
   - Do NOT use * or ** to bold or emphasize words.
4. Keep explanations step-by-step, pedagogical, and easy to understand.`;

/**
 * Creates a customized system prompt for a specific student grade and name
 */
export function createMathTutorSystemPrompt(options?: {
  studentClass?: number | string;
  studentName?: string;
}): string {
  const grade = options?.studentClass || 10;
  const name = options?.studentName || 'Student';

  return `You are "AI TUTOR", a dedicated, patient mathematics tutor for CBSE/NCERT Class ${grade} students. The student's name is ${name}.
IMPORTANT FORMATTING RULES:
1. Do NOT use markdown formatting:
   - NEVER use asterisks (* or **) for bolding, italics, or bullet points.
   - NEVER use hashtag/pound symbols (#, ##, ###) for headers.
2. Format all mathematical solutions and responses using ONLY:
   - Plain text with clean line breaks
   - Numbered steps (1., 2., 3., 4.) or uppercase keywords (e.g. GIVEN:, FORMULA:, STEP 1:, SOLUTION:, FINAL ANSWER:)
   - LaTeX notation for mathematical equations:
     * Inline math: $inline$ (e.g. $ax^2 + bx + c = 0$)
     * Display math on separate line: $$block$$
3. EMPHASIZING / BOLDING TEXT:
   - To bold or emphasize key terms, formulas, or headings, use HTML tags: <b>emphasized text</b> (e.g. <b>Key Formula:</b> or <b>Step 1:</b>).
   - Alternatively, write keywords in CAPITAL LETTERS.
   - NEVER use * or ** for bolding.
4. Maintain a supportive, step-by-step pedagogical tone tailored to CBSE Class ${grade}.`;
}

export function getOpenRouterConfig(): OpenRouterConfig {
  const apiKey = (process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || '').trim();
  const model = (process.env.OPENROUTER_MODEL || 'z-ai/glm-5.2:free').trim();
  const fallbackModel = (process.env.OPENROUTER_FALLBACK_MODEL || 'google/gemini-flash-1.5').trim();
  const appUrl = (process.env.APP_URL || 'http://localhost:3000').trim();

  return { apiKey, model, fallbackModel, appUrl };
}

export function isOpenRouterConfigured(): boolean {
  const { apiKey } = getOpenRouterConfig();
  if (!apiKey) return false;
  if (apiKey.includes('PASTE_YOUR') || apiKey.includes('YOUR_OPENROUTER_API_KEY')) return false;
  return apiKey.length > 5;
}

/**
 * Non-streaming chat completion request via OpenRouter API (OpenAI-compatible)
 */
export async function sendOpenRouterChat({
  messages,
  systemPrompt = DEFAULT_MATH_TUTOR_SYSTEM_PROMPT,
  modelOverride,
  temperature = 0.7,
}: {
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
  systemPrompt?: string;
  modelOverride?: string;
  temperature?: number;
}): Promise<{ content: string; modelUsed: string }> {
  const config = getOpenRouterConfig();
  if (!isOpenRouterConfigured()) {
    throw new Error('OPENROUTER_API_KEY is not configured in .env');
  }

  const primaryModel = modelOverride || config.model || 'z-ai/glm-5.2:free';
  const modelsToTry = [primaryModel];
  if (config.fallbackModel && config.fallbackModel !== primaryModel) {
    modelsToTry.push(config.fallbackModel);
  }

  const formattedMessages: ChatMessagePayload[] = [];
  if (systemPrompt) {
    formattedMessages.push({ role: 'system', content: systemPrompt });
  }
  formattedMessages.push(...messages);

  let lastError: Error | null = null;

  for (const modelToUse of modelsToTry) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'HTTP-Referer': config.appUrl || 'http://localhost:3000',
          'X-Title': 'MATHVERSE AI Tutor',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelToUse,
          messages: formattedMessages,
          temperature,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let parsedMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const parsed = JSON.parse(errorText);
          if (parsed?.error?.message) {
            parsedMessage = parsed.error.message;
          }
        } catch {
          // Keep raw status text
        }
        throw new Error(parsedMessage);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('Received empty response from OpenRouter API');
      }

      return { content, modelUsed: modelToUse };
    } catch (err: any) {
      lastError = err;
      console.warn(`Attempt with model "${modelToUse}" failed:`, err?.message);
    }
  }

  throw lastError || new Error('Failed to generate response from OpenRouter');
}

/**
 * Streaming chat completion via OpenRouter API using Server-Sent Events
 */
export async function streamOpenRouterChat({
  messages,
  systemPrompt = DEFAULT_MATH_TUTOR_SYSTEM_PROMPT,
  modelOverride,
  temperature = 0.7,
  onChunk,
  onDone,
  onError,
}: {
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
  systemPrompt?: string;
  modelOverride?: string;
  temperature?: number;
  onChunk: (text: string) => void;
  onDone: (modelUsed: string) => void;
  onError: (err: Error) => void;
}) {
  const config = getOpenRouterConfig();
  if (!isOpenRouterConfigured()) {
    onError(new Error('OPENROUTER_API_KEY is not configured in .env'));
    return;
  }

  const primaryModel = modelOverride || config.model || 'z-ai/glm-5.2:free';
  const modelsToTry = [primaryModel];
  if (config.fallbackModel && config.fallbackModel !== primaryModel) {
    modelsToTry.push(config.fallbackModel);
  }

  const formattedMessages: ChatMessagePayload[] = [];
  if (systemPrompt) {
    formattedMessages.push({ role: 'system', content: systemPrompt });
  }
  formattedMessages.push(...messages);

  let success = false;
  let lastError: Error | null = null;

  for (const modelToUse of modelsToTry) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'HTTP-Referer': config.appUrl || 'http://localhost:3000',
          'X-Title': 'MATHVERSE AI Tutor',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelToUse,
          messages: formattedMessages,
          temperature,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let parsedMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const parsed = JSON.parse(errorText);
          if (parsed?.error?.message) {
            parsedMessage = parsed.error.message;
          }
        } catch {
          // ignore
        }
        throw new Error(parsedMessage);
      }

      if (!response.body) {
        throw new Error('Response body is empty');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.slice(5).trim();
          if (dataStr === '[DONE]') {
            break;
          }

          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              onChunk(delta);
            }
          } catch {
            // Ignore partial/non-json parse failures
          }
        }
      }

      success = true;
      onDone(modelToUse);
      return;
    } catch (err: any) {
      lastError = err;
      console.warn(`Streaming attempt with model "${modelToUse}" failed:`, err?.message);
    }
  }

  if (!success) {
    onError(lastError || new Error('All OpenRouter model attempts failed'));
  }
}
