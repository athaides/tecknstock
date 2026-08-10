package com.tecno.tecnstock.repository;

import com.tecno.tecnstock.model.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Integer> {
}