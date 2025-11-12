import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

// ➕ Criar paciente
router.post("/", async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    const paciente = await Patient.create({ nome, email, telefone });
    res.status(201).json(paciente);
  } catch (error) {
    console.error("❌ Erro ao criar paciente:", error);
    res.status(500).json({ error: "Erro ao criar paciente" });
  }
});

// 📋 Listar pacientes
router.get("/", async (req, res) => {
  try {
    const pacientes = await Patient.getAll();
    res.json(pacientes);
  } catch (error) {
    console.error("❌ Erro ao buscar pacientes:", error);
    res.status(500).json({ error: "Erro ao buscar pacientes" });
  }
});

export default router;
