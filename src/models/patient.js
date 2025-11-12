import pool from "../config/db.js";

class Patient {
  // 🔹 Criar um novo paciente
  static async create({ nome, email, telefone, data_nascimento }) {
    try {
      const result = await pool.query(
        `INSERT INTO patients (nome, email, telefone, data_nascimento)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [nome, email, telefone, data_nascimento]
      );
      return result.rows[0];
    } catch (error) {
      console.error("❌ Erro ao criar paciente:", error);
      throw error;
    }
  }

  // 🔹 Buscar todos os pacientes
  static async getAll() {
    try {
      const result = await pool.query(`SELECT * FROM patients ORDER BY id ASC`);
      return result.rows;
    } catch (error) {
      console.error("❌ Erro ao buscar pacientes:", error);
      throw error;
    }
  }

  // 🔹 Buscar paciente por ID
  static async getById(id) {
    try {
      const result = await pool.query(`SELECT * FROM patients WHERE id = $1`, [
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("❌ Erro ao buscar paciente por ID:", error);
      throw error;
    }
  }

  // 🔹 Atualizar paciente
  static async update(id, { nome, email, telefone, data_nascimento }) {
    try {
      const result = await pool.query(
        `UPDATE patients
         SET nome = $1, email = $2, telefone = $3, data_nascimento = $4
         WHERE id = $5
         RETURNING *`,
        [nome, email, telefone, data_nascimento, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("❌ Erro ao atualizar paciente:", error);
      throw error;
    }
  }

  // 🔹 Deletar paciente
  static async delete(id) {
    try {
      await pool.query(`DELETE FROM patients WHERE id = $1`, [id]);
      return { message: "Paciente deletado com sucesso" };
    } catch (error) {
      console.error("❌ Erro ao deletar paciente:", error);
      throw error;
    }
  }
}

export default Patient;
