package com.tecno.tecnstock.repository;

import com.tecno.tecnstock.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCodigo(String codigo);
}