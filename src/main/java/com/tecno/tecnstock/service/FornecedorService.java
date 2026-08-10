package com.tecno.tecnstock.service;

import com.tecno.tecnstock.model.Fornecedor;
import com.tecno.tecnstock.repository.FornecedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FornecedorService {

    @Autowired
    private FornecedorRepository repository;

    public List<Fornecedor> listar() {
        return repository.findAll();
    }

    public Fornecedor buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));
    }

    public Fornecedor cadastrar(Fornecedor fornecedor) {
        return repository.save(fornecedor);
    }

    public Fornecedor atualizar(Integer id, Fornecedor novoFornecedor) {

        Fornecedor fornecedor = buscarPorId(id);

        fornecedor.setNome(novoFornecedor.getNome());
        fornecedor.setCnpj(novoFornecedor.getCnpj());
        fornecedor.setTelefone(novoFornecedor.getTelefone());
        fornecedor.setAtivo(novoFornecedor.getAtivo());

        return repository.save(fornecedor);
    }

    public void deletar(Integer id) {
        Fornecedor fornecedor = buscarPorId(id);
        repository.delete(fornecedor);
    }
}