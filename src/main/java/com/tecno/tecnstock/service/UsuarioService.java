package com.tecno.tecnstock.service;

import com.tecno.tecnstock.model.Usuario;
import com.tecno.tecnstock.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // LOGIN
    public Usuario login(String codigo, String senha) {

        Optional<Usuario> userOpt = repository.findByCodigo(codigo);

        if (userOpt.isPresent()) {
            Usuario user = userOpt.get();

            if (passwordEncoder.matches(senha, user.getSenha())) {
                return user;
            }
        }

        return null;
    }

    // LISTAR
    public List<Usuario> listar() {
        return repository.findAll();
    }

    // BUSCAR POR ID
    public Usuario buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    // CADASTRAR
    public Usuario cadastrar(Usuario usuario) {

        // valida duplicidade
        if (repository.findByCodigo(usuario.getCodigo()).isPresent()) {
            throw new RuntimeException("Código já existe");
        }

        // criptografa senha
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

        return repository.save(usuario);
    }

    // ATUALIZAR
    public Usuario atualizar(Integer id, Usuario novoUsuario) {

        Usuario usuario = buscarPorId(id);

        usuario.setCodigo(novoUsuario.getCodigo());
        usuario.setTipo(novoUsuario.getTipo());
        usuario.setAtivo(novoUsuario.getAtivo());

        // ⚠️ REGRA IMPORTANTE
        if (novoUsuario.getSenha() != null && !novoUsuario.getSenha().isEmpty()) {
            usuario.setSenha(passwordEncoder.encode(novoUsuario.getSenha()));
        }

        return repository.save(usuario);
    }

    // DELETAR
    public void deletar(Integer id) {
        Usuario usuario = buscarPorId(id);
        repository.delete(usuario);
    }
}