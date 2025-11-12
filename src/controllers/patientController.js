import { pool } from "../Config/db.js";

// Listar todos os pacientes
export const getPatients = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM patients ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar um paciente específico
export const getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM patients WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Paciente não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar um novo paciente
export const createPatient = async (req, res) => {
  const { name, age, phone, condition, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO patients (name, age, phone, condition, notes, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [name, age, phone, condition, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar paciente
export const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, age, phone, condition, notes } = req.body;
  try {
    const result = await pool.query(
      `UPDATE patients SET name=$1, age=$2, phone=$3, condition=$4, notes=$5
       WHERE id=$6 RETURNING *`,
      [name, age, phone, condition, notes, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Paciente não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar paciente
export const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM patients WHERE id = $1", [id]);
    res.json({ message: "Paciente deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
