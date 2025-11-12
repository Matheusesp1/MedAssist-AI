import express from "express";
import Appointment from "../models/appointment.js";

const router = express.Router();

// 📋 Listar todas as consultas
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.getAll();
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar consultas" });
  }
});

// 🔍 Buscar consulta por ID
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.getById(req.params.id);
    if (!appointment)
      return res.status(404).json({ error: "Consulta não encontrada" });
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar consulta" });
  }
});

// ➕ Criar nova consulta
router.post("/", async (req, res) => {
  try {
    const { patient_id, data_consulta, descricao, status } = req.body;
    const newAppointment = await Appointment.create({
      patient_id,
      data_consulta,
      descricao,
      status,
    });
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar consulta" });
  }
});

// ✏️ Atualizar consulta
router.put("/:id", async (req, res) => {
  try {
    const { patient_id, data_consulta, descricao, status } = req.body;
    const updatedAppointment = await Appointment.update(req.params.id, {
      patient_id,
      data_consulta,
      descricao,
      status,
    });
    res.json(updatedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar consulta" });
  }
});

// ❌ Excluir consulta
router.delete("/:id", async (req, res) => {
  try {
    const result = await Appointment.delete(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir consulta" });
  }
});

export default router;
