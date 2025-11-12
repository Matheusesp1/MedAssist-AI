const API_URL = "http://localhost:4000/api/patients";

const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const telefoneInput = document.getElementById("telefone");
const addButton = document.getElementById("addPaciente");
const listaPacientes = document.getElementById("listaPacientes");

// 🔹 Função para carregar pacientes
async function carregarPacientes() {
  listaPacientes.innerHTML =
    "<tr><td colspan='4' class='p-3 text-center text-gray-500'>Carregando...</td></tr>";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao buscar pacientes");

    const pacientes = await response.json();

    listaPacientes.innerHTML = "";

    if (pacientes.length === 0) {
      listaPacientes.innerHTML =
        "<tr><td colspan='4' class='p-3 text-center text-gray-500'>Nenhum paciente cadastrado.</td></tr>";
      return;
    }

    pacientes.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="border p-2 text-center">${p.id}</td>
        <td class="border p-2">${p.nome}</td>
        <td class="border p-2">${p.email}</td>
        <td class="border p-2">${p.telefone || "-"}</td>
      `;
      listaPacientes.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
    listaPacientes.innerHTML =
      "<tr><td colspan='4' class='p-3 text-center text-red-600'>Erro ao carregar pacientes.</td></tr>";
  }
}

// 🔹 Função para adicionar paciente
async function adicionarPaciente() {
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const telefone = telefoneInput.value.trim();

  if (!nome || !email) {
    alert("Por favor, preencha o nome e o email.");
    return;
  }

  const novoPaciente = { nome, email, telefone };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoPaciente),
    });

    if (!response.ok) throw new Error("Erro ao adicionar paciente");

    nomeInput.value = "";
    emailInput.value = "";
    telefoneInput.value = "";

    alert("✅ Paciente adicionado com sucesso!");
    carregarPacientes();
  } catch (error) {
    console.error(error);
    alert("❌ Falha ao adicionar paciente.");
  }
}

// 🔹 Eventos
addButton.addEventListener("click", adicionarPaciente);
document.addEventListener("DOMContentLoaded", carregarPacientes);
