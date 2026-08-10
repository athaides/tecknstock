package com.tecno.tecnstock.repository;

import com.tecno.tecnstock.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {


}