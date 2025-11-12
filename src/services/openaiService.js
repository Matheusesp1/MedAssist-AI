import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Configura o cliente da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Chave no .env
});

// 🧠 Endpoint para gerar análise de paciente
router.post("/analisar", async (req, res) => {
  try {
    const { nome, sintomas, historico } = req.body;

    if (!sintomas && !historico) {
      return res
        .status(400)
        .json({ error: "Forneça sintomas ou histórico do paciente." });
    }

    const prompt = `
Você é um assistente médico inteligente. Analise as informações do paciente e gere um breve resumo clínico.
Paciente: ${nome || "Não informado"}
Sintomas: ${sintomas || "Não informado"}
Histórico: ${historico || "Não informado"}

Gere:
- Um resumo clínico breve
- Possíveis causas (sem diagnóstico definitivo)
- Sugestão de próximos passos
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const texto = response.choices[0].message.content;
    res.json({ resultado: texto });
  } catch (err) {
    console.error("Erro na rota de IA:", err);
    res.status(500).json({ error: "Erro ao gerar resposta da IA." });
  }
});

export default router;
