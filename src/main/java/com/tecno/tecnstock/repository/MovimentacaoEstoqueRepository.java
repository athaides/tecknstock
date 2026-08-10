package com.tecno.tecnstock.repository;

import com.tecno.tecnstock.model.MovimentacaoEstoque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimentacaoEstoqueRepository
        extends JpaRepository<MovimentacaoEstoque, Integer> {
}