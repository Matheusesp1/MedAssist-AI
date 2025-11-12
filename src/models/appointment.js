import pool from "../config/db.js";

class Appointment {
  static async getAll() {
    const result = await pool.query(
      `SELECT a.*, p.nome AS paciente_nome 
       FROM appointments a 
       JOIN patients p ON a.patient_id = p.id 
       ORDER BY a.data_consulta DESC`
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query("SELECT * FROM appointments WHERE id=$1", [
      id,
    ]);
    return result.rows[0];
  }

  static async create({ patient_id, data_consulta, descricao, status }) {
    const result = await pool.query(
      "INSERT INTO appointments (patient_id, data_consulta, descricao, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [patient_id, data_consulta, descricao, status]
    );
    return result.rows[0];
  }

  static async update(id, { patient_id, data_consulta, descricao, status }) {
    const result = await pool.query(
      "UPDATE appointments SET patient_id=$1, data_consulta=$2, descricao=$3, status=$4 WHERE id=$5 RETURNING *",
      [patient_id, data_consulta, descricao, status, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query("DELETE FROM appointments WHERE id=$1", [id]);
    return { message: "Consulta removida com sucesso" };
  }
}
export default Appointment;