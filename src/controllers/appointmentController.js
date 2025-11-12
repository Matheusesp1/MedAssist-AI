import { pool } from "../Config/db.js";

// Listar todas as consultas
export const getAppointments = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*, p.name AS patient_name
      FROM appointments a
      JOIN patients p ON p.id = a.patient_id
      ORDER BY a.date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar uma consulta específica
export const getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Consulta não encontrada" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar nova consulta
export const createAppointment = async (req, res) => {
  const { patient_id, date, notes, prescription } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO appointments (patient_id, date, notes, prescription, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [patient_id, date, notes, prescription]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar consulta
export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, notes, prescription } = req.body;
  try {
    const result = await pool.query(
      `UPDATE appointments SET date=$1, notes=$2, prescription=$3
       WHERE id=$4 RETURNING *`,
      [date, notes, prescription, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Consulta não encontrada" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar consulta
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM appointments WHERE id = $1", [id]);
    res.json({ message: "Consulta deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
