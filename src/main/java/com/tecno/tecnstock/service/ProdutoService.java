package com.tecno.tecnstock.service;

import com.tecno.tecnstock.model.Produto;
import com.tecno.tecnstock.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public List<Produto> listar() {
        return repository.findAll();
    }

    public Produto buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    public Produto cadastrar(Produto produto) {
        produto.setCriadoEm(LocalDateTime.now());
        return repository.save(produto);
    }

    public Produto atualizar(Integer id, Produto novoProduto) {

        Produto produto = buscarPorId(id);

        produto.setNome(novoProduto.getNome());
        produto.setDescricao(novoProduto.getDescricao());
        produto.setPreco(novoProduto.getPreco());
        produto.setQuantidade(novoProduto.getQuantidade());
        produto.setIdFornecedor(novoProduto.getIdFornecedor());
        produto.setAtivo(novoProduto.getAtivo());

        return repository.save(produto);
    }

    public void deletar(Integer id) {
        Produto produto = buscarPorId(id);
        repository.delete(produto);
    }
}