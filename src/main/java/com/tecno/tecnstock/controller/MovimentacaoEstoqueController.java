package com.tecno.tecnstock.controller;

import com.tecno.tecnstock.model.MovimentacaoEstoque;
import com.tecno.tecnstock.service.MovimentacaoEstoqueService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/estoque")
@CrossOrigin
public class MovimentacaoEstoqueController {

    @Autowired
    private MovimentacaoEstoqueService service;

    // ENTRADA
    @PostMapping("/entrada")

    public MovimentacaoEstoque entrada(

            @RequestParam Integer idProduto,

            @RequestParam Integer quantidade,

            @RequestParam(required = false)
            String observacao
    ) {

        return service.entrada(
                idProduto,
                quantidade,
                observacao
        );
    }

    // SAÍDA
    @PostMapping("/saida")

    public MovimentacaoEstoque saida(

            @RequestParam Integer idProduto,

            @RequestParam Integer quantidade,

            @RequestParam(required = false)
            String observacao
    ) {

        return service.saida(
                idProduto,
                quantidade,
                observacao
        );
    }
}