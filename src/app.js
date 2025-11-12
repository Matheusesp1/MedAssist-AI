import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import patientRoutes from "./routes/patientRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Rotas
app.use("/api/patients", patientRoutes);

// 🔹 Rota padrão
app.get("/", (req, res) => {
  res.send("API MedAssist está rodando 🩺");
});

// 🔹 Inicialização
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
