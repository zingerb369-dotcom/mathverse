# OpenRouter API Setup for MATHVERSE AI Tutor

Follow these step-by-step instructions to configure OpenRouter with the free GLM model for MATHVERSE:

1. **Open OpenRouter**  
   Navigate to [https://openrouter.ai](https://openrouter.ai) in your browser and sign in or create a free account.

2. **Create / Copy Your API Key**  
   Go to [https://openrouter.ai/keys](https://openrouter.ai/keys) and click **Create Key**. Copy your generated key (it starts with `sk-or-v1-...`).

3. **Open the Project's `.env` File**  
   Open the root-level `.env` file in the MATHVERSE project folder.

4. **Find the Variable Line**  
   Find the following line:
   ```env
   OPENROUTER_API_KEY=PASTE_YOUR_OPENROUTER_API_KEY_HERE
   ```

5. **Paste Your Key**  
   Replace `PASTE_YOUR_OPENROUTER_API_KEY_HERE` with your key after the `=`:
   ```env
   OPENROUTER_API_KEY=sk-or-v1-your-actual-api-key-here
   ```

6. **Save the File**  
   Save your `.env` file.

7. **Restart the Development Server**  
   Stop the running server (press `Ctrl + C` in your terminal) and restart it:
   ```bash
   npm run dev
   ```

8. **Open MATHVERSE**  
   Navigate to the MATHVERSE application in your browser (typically `http://localhost:3000`).

9. **Test AI TUTOR**  
   Open the **AI TUTOR** tab from the navigation bar. Ask any mathematics question (e.g., *"Explain quadratic formula with a CBSE Class 10 example"*) or use the quick action buttons to verify that the GLM model responds in real time.

---

### Model Configuration Details
- **Default Model Identifier**: `z-ai/glm-5.2:free`
- This model is 100% free on OpenRouter and provides advanced mathematical reasoning and step-by-step solutions for CBSE & NCERT mathematics.
- To use another model in the future, you can customize `OPENROUTER_MODEL` in `.env`:
  ```env
  OPENROUTER_MODEL=z-ai/glm-5.2:free
  ```

### Security Note
- Your API key remains strictly on the server and is never exposed in browser bundles, HTML, or git commits.
- `.env` is listed in `.gitignore` to prevent accidental commits.
