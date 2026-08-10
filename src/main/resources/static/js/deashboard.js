async function carregarDashboard(){

    // =========================
    // PRODUTOS
    // =========================

    const produtosResponse =
        await fetch("http://localhost:8080/api/produtos");

    const produtos =
        await produtosResponse.json();

    document.getElementById("totalProdutos")
        .innerText = produtos.length;

    const baixo =
        produtos.filter(p => p.quantidade < 10);

    document.getElementById("baixoEstoque")
        .innerText = baixo.length;

    let tabela =
        document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(produto => {

        tabela.innerHTML += `

            <tr>

                <td>${produto.nome}</td>

                <td>${produto.quantidade}</td>

                <td>

                    <button onclick="editarProduto(${produto.id})">

                        Editar

                    </button>

                </td>

            </tr>

        `;
    });

    // =========================
    // USUÁRIOS
    // =========================

    const usuariosResponse =
        await fetch("http://localhost:8080/api/usuarios");

    const usuarios =
        await usuariosResponse.json();

    document.getElementById("totalUsuarios")
        .innerText = usuarios.length;

    // =========================
    // FORNECEDORES
    // =========================

    document.getElementById("totalFornecedores")
        .innerText = 0;
}

function editarProduto(id){

    window.location.href =
        "/pages/produtos.html?id=" + id;
}

carregarDashboard();