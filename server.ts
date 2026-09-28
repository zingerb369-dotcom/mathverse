import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import {
  getOpenRouterStatus,
  getOpenRouterModel,
  isOpenRouterConfigured,
  formatTutorMessages,
  sendOpenRouterChat,
  streamOpenRouterChat,
  OpenRouterError,
} from './src/server/openrouter.ts';

dotenv.config();
if (!process.env.OPENROUTER_API_KEY) {
  dotenv.config({ path: '.env.example' });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // In-memory server-side streak state
  let serverStreakDays = 1;

  // Server-side streak management routes
  app.get('/api/streak', (_req, res) => {
    return res.json({ streak: serverStreakDays });
  });

  app.post('/api/streak', (req, res) => {
    const { days } = req.body;
    if (typeof days === 'number' && !isNaN(days)) {
      serverStreakDays = Math.max(1, Math.floor(days));
    }
    return res.json({
      streak: serverStreakDays,
      success: true,
      message: `Server streak set to ${serverStreakDays} days`,
    });
  });

  // Status check for AI Tutor / OpenRouter configuration
  app.get('/api/ai/status', (_req, res) => {
    return res.json(getOpenRouterStatus());
  });

  // Primary endpoint requested: /api/ai/chat
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const {
        message,
        history = [],
        studentName,
        studentClass = 10,
        topic = '',
        action = '',
      } = req.body;

      if (!message && !action && (!Array.isArray(history) || history.length === 0)) {
        return res.status(400).json({ error: 'Message, action, or history is required' });
      }

      if (!isOpenRouterConfigured()) {
        return res.status(401).json({
          error: "AI Tutor is not configured yet. Please add your OpenRouter API key to the project's .env file.",
          isConfigError: true,
          model: getOpenRouterModel(),
        });
      }

      const formattedMessages = formatTutorMessages({
        message,
        action,
        history,
        studentClass,
        studentName,
        topic,
      });

      const replyText = await sendOpenRouterChat(formattedMessages);
      return res.json({
        response: replyText,
        model: getOpenRouterModel(),
      });
    } catch (err: any) {
      console.error('AI chat endpoint error:', err);
      const statusCode = err instanceof OpenRouterError ? err.status : 500;
      return res.status(statusCode).json({
        error: err.message || 'An unexpected error occurred while communicating with OpenRouter.',
        isConfigError: Boolean(err.isConfigError),
        isRateLimit: Boolean(err.isRateLimit),
        isModelUnavailable: Boolean(err.isModelUnavailable),
        model: getOpenRouterModel(),
      });
    }
  });

  // Backward-compatible endpoint: /api/tutor
  app.post('/api/tutor', async (req, res) => {
    try {
      const {
        message,
        history = [],
        studentName,
        studentClass = 10,
        topic = '',
        action = '',
      } = req.body;

      if (!message && !action && (!Array.isArray(history) || history.length === 0)) {
        return res.status(400).json({ error: 'Message, action, or history is required' });
      }

      if (!isOpenRouterConfigured()) {
        return res.status(401).json({
          error: "AI Tutor is not configured yet. Please add your OpenRouter API key to the project's .env file.",
          isConfigError: true,
          model: getOpenRouterModel(),
        });
      }

      const formattedMessages = formatTutorMessages({
        message,
        action,
        history,
        studentClass,
        studentName,
        topic,
      });

      const replyText = await sendOpenRouterChat(formattedMessages);
      return res.json({ response: replyText, model: getOpenRouterModel() });
    } catch (err: any) {
      console.error('Tutor endpoint error:', err);
      const statusCode = err instanceof OpenRouterError ? err.status : 500;
      return res.status(statusCode).json({
        error: err.message || 'Failed to process tutoring request',
        isConfigError: Boolean(err.isConfigError),
        isRateLimit: Boolean(err.isRateLimit),
        isModelUnavailable: Boolean(err.isModelUnavailable),
        model: getOpenRouterModel(),
      });
    }
  });

  // AI Tutor Streaming API endpoint (Server-Sent Events)
  app.post('/api/tutor/stream', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();

    const {
      message,
      history = [],
      studentName,
      studentClass = 10,
      topic = '',
      action = '',
    } = req.body;

    if (!isOpenRouterConfigured()) {
      res.write(
        `data: ${JSON.stringify({
          error: "AI Tutor is not configured yet. Please add your OpenRouter API key to the project's .env file.",
          isConfigError: true,
          model: getOpenRouterModel(),
        })}\n\n`
      );
      res.write('data: [DONE]\n\n');
      return res.end();
    }

    try {
      const formattedMessages = formatTutorMessages({
        message,
        action,
        history,
        studentClass,
        studentName,
        topic,
      });

      await streamOpenRouterChat(formattedMessages, (textChunk: string) => {
        if (textChunk) {
          res.write(`data: ${JSON.stringify({ text: textChunk })}\n\n`);
        }
      });

      res.write('data: [DONE]\n\n');
      return res.end();
    } catch (err: any) {
      console.error('Streaming tutor error:', err);
      res.write(
        `data: ${JSON.stringify({
          error: err.message || 'Error streaming response from OpenRouter.',
          isConfigError: Boolean(err.isConfigError),
          isRateLimit: Boolean(err.isRateLimit),
          isModelUnavailable: Boolean(err.isModelUnavailable),
          model: getOpenRouterModel(),
        })}\n\n`
      );
      res.write('data: [DONE]\n\n');
      return res.end();
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Setup Vite dev server or static file serving
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`MATHVERSE server running on http://localhost:${port}`);
  });
}

function generateLocalTutorResponse(
  query: string,
  action: string,
  grade: number | string,
  name: string = 'Student',
  topic: string = ''
): string {
  const q = (query + ' ' + topic).toLowerCase();

  let subjectHint = 'CBSE Class ' + grade + ' Mathematics';

  if (q.includes('pythagoras') || q.includes('triangle') || q.includes('right triangle')) {
    return `Hello ${name}! Here is a clear, step-by-step breakdown of the **Pythagorean Theorem** (${subjectHint}):

### 1. Statement
In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.
$$\\mathbf{Hypotenuse^2 = Base^2 + Perpendicular^2}$$
Or in standard notation:
$$c^2 = a^2 + b^2$$

### 2. Why this works
Consider a right triangle $\\triangle ABC$ with $\\angle B = 90^\\circ$:
- The side opposite to the $90^\\circ$ angle is always the **hypotenuse** (the longest side, $AC$).
- If $AB = 3\\text{ cm}$ and $BC = 4\\text{ cm}$:
  $$AC^2 = 3^2 + 4^2 = 9 + 16 = 25$$
  $$AC = \\sqrt{25} = 5\\text{ cm}$$

### 3. Common Exam Mistake
Students often mistakenly add $a + b$ before squaring, or identify the wrong side as the hypotenuse. Hypotenuse is **strictly** the side facing the $90^\\circ$ right angle.

### 4. Practice Question
A $10\\text{ m}$ ladder reaches a window $8\\text{ m}$ above the ground. How far is the foot of the ladder from the wall?
*(Hint: Hypotenuse $= 10$, height $= 8$, find base using $b = \\sqrt{10^2 - 8^2} = 6\\text{ m}$)*.`;
  }

  if (q.includes('quadratic') || q.includes('factorisation') || q.includes('roots') || q.includes('discriminant')) {
    return `Hello ${name}! Let's master **Quadratic Equations** for Class ${grade}:

### 1. Standard Form
Any quadratic equation is written as:
$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$

### 2. Solving Methods:
1. **Splitting the Middle Term (Factorization)**: Find two numbers $p$ and $q$ such that:
   - $p + q = b$
   - $p \\times q = a \\times c$
2. **Quadratic Formula (Sridharacharya's Rule)**:
   $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

### 3. Nature of Roots (Discriminant $D = b^2 - 4ac$):
- If $D > 0$: Two distinct real roots.
- If $D = 0$: Two equal real roots ($x = -b / 2a$).
- If $D < 0$: No real roots.

### 4. Step-by-Step Solved Example:
Solve $x^2 - 5x + 6 = 0$:
- We need two numbers with sum $-5$ and product $6$: they are $-2$ and $-3$.
- Split middle term: $x^2 - 2x - 3x + 6 = 0$
- Group terms: $x(x - 2) - 3(x - 2) = 0 \\implies (x - 2)(x - 3) = 0$
- Therefore, $x = 2$ or $x = 3$.`;
  }

  if (q.includes('fraction') || q.includes('rational') || q.includes('decimal')) {
    return `Hello ${name}! Let's review **Fractions & Rational Numbers** for Class ${grade}:

### 1. Core Definition
A rational number is any number that can be expressed in the form:
$$\\frac{p}{q}, \\quad \\text{where } p, q \\in \\mathbb{Z} \\text{ and } q \\neq 0$$

### 2. Operations Rule
- **Addition/Subtraction**: Always find the Least Common Multiple (LCM) of the denominators first.
  $$\\frac{a}{b} + \\frac{c}{d} = \\frac{a \\cdot d + c \\cdot b}{b \\cdot d}$$
- **Multiplication**: Multiply numerators together, and denominators together.
- **Division**: Multiply by the reciprocal of the divisor: $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$.

### 3. Pro-Tip
Never cancel terms across an addition sign! You can only simplify factors, never individual terms separated by $+$ or $-$.`;
  }

  return `Hello ${name}! I am your **MATHVERSE CBSE Class ${grade} Tutor**.

Regarding your query: "${query || topic || 'Mathematics Concepts'}":

### 1. Conceptual Framework
In the CBSE 2026-27 curriculum, understanding the fundamental definitions and structural logic comes first before rote memorization:
- **Concept Verification**: Write down given quantities, required targets, and standard formula.
- **Step-by-Step Derivation**: Substitute values with consistent units.
- **Simplification**: Apply algebraic identities or geometric theorems systematically.

### 2. Key Strategies for High Accuracy
1. Always write the general formula first; CBSE awarding schemes allocate partial step marks for correct formula notation.
2. Check your units (e.g. cm vs m, degrees vs radians, squared units for area).
3. Do a reverse check: substitute your final answer back into the original problem statement to verify!

Feel free to ask me to:
- Explain any formula or theorem step-by-step
- Provide an exam-style solved example
- Show alternate methods or shortcuts
- Generate customized practice questions!`;
}

startServer();
