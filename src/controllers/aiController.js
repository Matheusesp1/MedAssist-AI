import openai  from "../services/openaiService.js";
import Patient from "../models/Patient.js";

export const askAI = async (req, res) => {
  const { question } = req.body;
  try {
    const patients = await Patient.getAllPatients();


    const prompt = `
Você é uma assistente médica que ajuda a gerenciar pacientes.
Use os dados abaixo:
${JSON.stringify(patients)}
Pergunta: ${question}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 export default Patient;