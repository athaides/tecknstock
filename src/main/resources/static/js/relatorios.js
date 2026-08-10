async function carregarRelatorios() {

    try {

        const response =
            await fetch("/api/produtos");

        const produtos =
            await response.json();

        // TOTAL PRODUTOS
        document.getElementById(
            "totalProdutos"
        ).innerText = produtos.length;

        // TOTAL ESTOQUE
        let totalEstoque = 0;

        produtos.forEach(produto => {

            totalEstoque +=
                produto.quantidade || 0;
        });

        document.getElementById(
            "totalEstoque"
        ).innerText = totalEstoque;

        // TABELA
        const corpoTabela =
            document.getElementById(
                "corpoTabela"
            );

        corpoTabela.innerHTML = "";

        produtos.forEach(produto => {

            corpoTabela.innerHTML += `

                <tr>

                    <td>${produto.id}</td>

                    <td>${produto.nome}</td>

                    <td>${produto.quantidade}</td>

                    <td>
                        R$ ${Number(
                            produto.preco
                        ).toFixed(2)}
                    </td>

                </tr>
            `;
        });

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar relatórios"
        );
    }
}

carregarRelatorios();