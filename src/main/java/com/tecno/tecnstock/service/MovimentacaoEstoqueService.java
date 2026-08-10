package com.tecno.tecnstock.service;

import com.tecno.tecnstock.model.MovimentacaoEstoque;
import com.tecno.tecnstock.model.Produto;
import com.tecno.tecnstock.repository.MovimentacaoEstoqueRepository;
import com.tecno.tecnstock.repository.ProdutoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MovimentacaoEstoqueService {

    @Autowired
    private MovimentacaoEstoqueRepository repository;

    @Autowired
    private ProdutoRepository produtoRepository;

    // ENTRADA
    public MovimentacaoEstoque entrada(
            Integer idProduto,
            Integer quantidade,
            String observacao
    ) {

        Produto produto = produtoRepository.findById(idProduto)
                .orElseThrow(() ->
                        new RuntimeException("Produto não encontrado"));

        Integer estoqueAtual =
                produto.getQuantidade() != null
                        ? produto.getQuantidade()
                        : 0;

        produto.setQuantidade(
                estoqueAtual + quantidade
        );

        produtoRepository.save(produto);

        MovimentacaoEstoque mov =
                new MovimentacaoEstoque();

        mov.setIdProduto(produto.getId());
        mov.setTipo("ENTRADA");
        mov.setQuantidade(quantidade);
        mov.setObservacao(observacao);
        mov.setDataMovimentacao(LocalDateTime.now());

        return repository.save(mov);
    }

    // SAÍDA
    public MovimentacaoEstoque saida(
            Integer idProduto,
            Integer quantidade,
            String observacao
    ) {

        Produto produto = produtoRepository.findById(idProduto)
                .orElseThrow(() ->
                        new RuntimeException("Produto não encontrado"));

        Integer estoqueAtual =
                produto.getQuantidade() != null
                        ? produto.getQuantidade()
                        : 0;

        if (estoqueAtual < quantidade) {

            throw new RuntimeException(
                    "Estoque insuficiente"
            );
        }

        produto.setQuantidade(
                estoqueAtual - quantidade
        );

        produtoRepository.save(produto);

        MovimentacaoEstoque mov =
                new MovimentacaoEstoque();

        mov.setIdProduto(produto.getId());
        mov.setTipo("SAIDA");
        mov.setQuantidade(quantidade);
        mov.setObservacao(observacao);
        mov.setDataMovimentacao(LocalDateTime.now());

        return repository.save(mov);
    }}
