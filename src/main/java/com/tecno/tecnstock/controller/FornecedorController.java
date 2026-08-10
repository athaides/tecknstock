package com.tecno.tecnstock.controller;

import com.tecno.tecnstock.model.Fornecedor;
import com.tecno.tecnstock.service.FornecedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fornecedores")
@CrossOrigin
public class FornecedorController {

    @Autowired
    private FornecedorService service;

    @GetMapping
    public List<Fornecedor> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Fornecedor buscar(@PathVariable Integer id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public Fornecedor cadastrar(@RequestBody Fornecedor fornecedor) {
        return service.cadastrar(fornecedor);
    }

    @PutMapping("/{id}")
    public Fornecedor atualizar(@PathVariable Integer id,
                                @RequestBody Fornecedor fornecedor) {
        return service.atualizar(id, fornecedor);
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable Integer id) {
        service.deletar(id);
        return "Fornecedor deletado com sucesso";
    }
}