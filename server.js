require('dotenv').config();  // Aquí sí, porque es Node puro.
const express = require('express');
const cors = require('cors');
const { callGeminiApi } = require('./src/utils/geminiHelper');  // Reusa el helper, pero sin client guards

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    const text = await callGeminiApi(prompt);  // Llama con key server-side
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Proxy server en 5000 – IA segura!'));