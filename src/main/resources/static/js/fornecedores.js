let fornecedorEditandoId = null;

async function carregarFornecedores() {
 try {
 const response = await fetch("/api/fornecedores");
 if (!response.ok) {
 throw new Error("Erro ao carregar fornecedores");
 }
 const fornecedores = await response.json();
 const lista = document.getElementById("listaFornecedores");
 lista.innerHTML = "";
 fornecedores.forEach(fornecedor => {
 const item = document.createElement("div");
 item.classList.add("produto-card");
 item.innerHTML = `
 <div>
 <h3>${fornecedor.nome}</h3>
 <p class="desc">CNPJ: ${fornecedor.cnpj || "Não informado"}</p>
 </div>
 <div>
 <div class="produto-details">
 <div class="produto-row">
 <span>ID</span>
 <span>${fornecedor.id}</span>
 </div>
 <div class="produto-row">
 <span>Telefone</span>
 <span>${fornecedor.telefone || "Não informado"}</span>
 </div>
 <div class="produto-row">
 <span>Status</span>
 <span>${fornecedor.ativo ? "Ativo" : "Inativo"}</span>
 </div>
 </div>
 <div class="acoes">
 <button class="btn-edit" onclick="editarFornecedor(${fornecedor.id})">Alterar</button>
 <button class="btn-danger" onclick="deletarFornecedor(${fornecedor.id})">Excluir</button>
 </div>
 </div>
 `;
 lista.appendChild(item);
 });
 } catch (erro) {
 console.error("ERRO AO CARREGAR FORNECEDORES:", erro);
 document.getElementById("mensagem").innerText = "Erro ao carregar fornecedores";
 }
}

async function salvarFornecedor() {
 const fornecedor = {
 nome: document.getElementById("nome").value,
 cnpj: document.getElementById("cnpj").value,
 telefone: document.getElementById("telefone").value,
 ativo: true
 };
 try {
 let response;
 // EDITAR
 if (fornecedorEditandoId !== null) {
 response = await fetch(`/api/fornecedores/${fornecedorEditandoId}`, {
 method: "PUT",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(fornecedor)
 });
 } else {
 // CADASTRAR
 response = await fetch("/api/fornecedores", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(fornecedor)
 });
 }
 if (!response.ok) {
 const erroTexto = await response.text();
 throw new Error(erroTexto);
 }
 document.getElementById("mensagem").innerText = fornecedorEditandoId !== null
 ? "Fornecedor updated com sucesso"
 : "Fornecedor cadastrado com sucesso";
 limparFormulario();
 carregarFornecedores();
 } catch (erro) {
 console.error("ERRO AO SALVAR FORNECEDOR:", erro);
 document.getElementById("mensagem").innerText = erro.message;
 }
}

async function editarFornecedor(id) {
 try {
 const response = await fetch(`/api/fornecedores/${id}`);
 if (!response.ok) {
 throw new Error("Erro ao buscar fornecedor");
 }
 const fornecedor = await response.json();
 fornecedorEditandoId = id;
 // PREENCHE FORMULÁRIO
 document.getElementById("nome").value = fornecedor.nome || "";
 document.getElementById("cnpj").value = fornecedor.cnpj || "";
 document.getElementById("telefone").value = fornecedor.telefone || "";
 // ALTERA TEXTO DO BOTÃO
 document.querySelector(".btn-primary").innerText = "Salvar Alterações";
 } catch (erro) {
 console.error("ERRO AO EDITAR FORNECEDOR:", erro);
 }
}

async function deletarFornecedor(id) {
 const confirmar = confirm("Deseja realmente excluir este fornecedor?");
 if (!confirmar) return;
 try {
 const response = await fetch(`/api/fornecedores/${id}`, { method: "DELETE" });
 if (!response.ok) {
 throw new Error("Erro ao excluir fornecedor");
 }
 carregarFornecedores();
 } catch (erro) {
 console.error("ERRO AO EXCLUIR FORNECEDOR:", erro);
 document.getElementById("mensagem").innerText = erro.message;
 }
}

function limparFormulario() {
 document.getElementById("nome").value = "";
 document.getElementById("cnpj").value = "";
 document.getElementById("telefone").value = "";
 fornecedorEditandoId = null;
 document.querySelector(".btn-primary").innerText = "Salvar Fornecedor";
}

// ===============================
// ADICIONADO: FILTRAR FORNECEDORES (BUSCA)
// ===============================
function filtrarFornecedores() {
 const termoBusca = document.getElementById("inputBuscaFornecedor").value.toLowerCase().trim();
 const cards = document.querySelectorAll("#listaFornecedores .produto-card");

 cards.forEach(card => {
 const nomeFornecedor = card.querySelector("h3").innerText.toLowerCase();

 if (nomeFornecedor.includes(termoBusca)) {
 card.style.display = "flex";
 } else {
 card.style.display = "none";
 }
 });
}

window.onload = carregarFornecedores;
