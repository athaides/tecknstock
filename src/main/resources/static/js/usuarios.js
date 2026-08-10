// ===============================
// CONTROLE DE EDIÇÃO
// ===============================

let usuarioEditandoId = null;

// ===============================
// CARREGAR USUÁRIOS
// ===============================

async function carregarUsuarios() {

    try {

        const response =
            await fetch("/api/usuarios");

        if (!response.ok) {

            throw new Error(
                "Erro ao carregar usuários"
            );
        }

        const usuarios =
            await response.json();

        const lista =
            document.getElementById(
                "listaUsuarios"
            );

        lista.innerHTML = "";

        usuarios.forEach(usuario => {

            const item =
                document.createElement("div");

            item.classList.add("produto-card");

            item.innerHTML = `

                <div>

                    <h3>
                        ${usuario.codigo}
                    </h3>

                    <p class="desc">
                        Tipo:
                        ${usuario.tipo}
                    </p>

                </div>

                <div>

                    <div class="produto-details">

                        <div class="produto-row">

                            <span>ID</span>

                            <span>
                                ${usuario.id}
                            </span>

                        </div>

                        <div class="produto-row">

                            <span>Status</span>

                            <span>
                                ${usuario.ativo
                                    ? "Ativo"
                                    : "Inativo"}
                            </span>

                        </div>

                    </div>

                    <div class="acoes">

                        <button
                            class="btn-edit"
                            onclick="editarUsuario(${usuario.id})">

                            Alterar

                        </button>

                        <button
                            class="btn-danger"
                            onclick="deletarUsuario(${usuario.id})">

                            Excluir

                        </button>

                    </div>

                </div>
            `;

            lista.appendChild(item);
        });

    } catch (erro) {

        console.error(
            "ERRO AO CARREGAR USUÁRIOS:",
            erro
        );

        document.getElementById("mensagem")
            .innerText =
                "Erro ao carregar usuários";
    }
}

// ===============================
// SALVAR USUÁRIO
// ===============================

async function salvarUsuario() {

    const usuario = {

        codigo:
            document.getElementById("codigo").value,

        senha:
            document.getElementById("senha").value,

        tipo:
            document.getElementById("tipo").value,

        ativo: true
    };

    // VALIDAÇÕES
    if (!usuario.codigo) {

        document.getElementById("mensagem")
            .innerText =
                "Informe o código";

        return;
    }

    // senha obrigatória apenas no cadastro
    if (
        usuarioEditandoId === null &&
        !usuario.senha
    ) {

        document.getElementById("mensagem")
            .innerText =
                "Informe a senha";

        return;
    }

    try {

        let response;

        // ===============================
        // EDITAR
        // ===============================

        if (usuarioEditandoId !== null) {

            response = await fetch(

                `/api/usuarios/${usuarioEditandoId}`,

                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(usuario)
                }
            );
        }

        // ===============================
        // CADASTRAR
        // ===============================

        else {

            response = await fetch(

                "/api/usuarios/cadastrar",

                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(usuario)
                }
            );
        }

        if (!response.ok) {

            const erroTexto =
                await response.text();

            throw new Error(erroTexto);
        }

        document.getElementById("mensagem")
            .innerText =

            usuarioEditandoId !== null
                ? "Usuário atualizado com sucesso"
                : "Usuário cadastrado com sucesso";

        limparFormulario();

        carregarUsuarios();

    } catch (erro) {

        console.error(
            "ERRO AO SALVAR USUÁRIO:",
            erro
        );

        document.getElementById("mensagem")
            .innerText =
                erro.message;
    }
}

// ===============================
// EDITAR USUÁRIO
// ===============================

async function editarUsuario(id) {

    try {

        const response =
            await fetch(`/api/usuarios/${id}`);

        if (!response.ok) {

            throw new Error(
                "Erro ao buscar usuário"
            );
        }

        const usuario =
            await response.json();

        usuarioEditandoId = id;

        // PREENCHE CAMPOS
        document.getElementById("codigo").value =
            usuario.codigo || "";

        document.getElementById("tipo").value =
            usuario.tipo || "FUNCIONARIO";

        // senha vazia por segurança
        document.getElementById("senha").value =
            "";

        // ALTERA TEXTO BOTÃO
        document.querySelector(".btn-primary")
            .innerText =
                "Salvar Alterações";

    } catch (erro) {

        console.error(
            "ERRO AO EDITAR USUÁRIO:",
            erro
        );

        document.getElementById("mensagem")
            .innerText =
                erro.message;
    }
}

// ===============================
// DELETAR USUÁRIO
// ===============================

async function deletarUsuario(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este usuário?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const response =
            await fetch(`/api/usuarios/${id}`, {

                method: "DELETE"
            });

        if (!response.ok) {

            throw new Error(
                "Erro ao excluir usuário"
            );
        }

        carregarUsuarios();

    } catch (erro) {

        console.error(
            "ERRO AO EXCLUIR USUÁRIO:",
            erro
        );

        document.getElementById("mensagem")
            .innerText =
                erro.message;
    }
}

// ===============================
// LIMPAR FORMULÁRIO
// ===============================

function limparFormulario() {

    document.getElementById("codigo").value =
        "";

    document.getElementById("senha").value =
        "";

    document.getElementById("tipo").value =
        "FUNCIONARIO";

    usuarioEditandoId = null;

    document.querySelector(".btn-primary")
        .innerText =
            "Salvar Usuário";
}

// ===============================
// INICIALIZAÇÃO
// ===============================

window.onload = carregarUsuarios;
// ===============================
// FILTRAR USUÁRIOS (BUSCA)
// ===============================

function filtrarUsuarios() {
    // Pega o termo digitado e remove espaços extras
    const termoBusca = document.getElementById("inputBuscaUsuario").value.toLowerCase().trim();

    // Seleciona todos os cards de usuários gerados na tela
    const cards = document.querySelectorAll("#listaUsuarios .produto-card");

    cards.forEach(card => {
        // Pega o código do usuário que está dentro da tag h3 do card
        const codigoUsuario = card.querySelector("h3").innerText.toLowerCase();

        // Se o código contiver o termo pesquisado, exibe o card. Se não, esconde.
        if (codigoUsuario.includes(termoBusca)) {
            card.style.display = "flex"; // Mantém o layout flex original
        } else {
            card.style.display = "none"; // Esconde o card que não bate com a busca
        }
    });
}
