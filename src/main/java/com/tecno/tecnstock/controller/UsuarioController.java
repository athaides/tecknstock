package com.tecno.tecnstock.controller;

import com.tecno.tecnstock.model.Usuario;
import com.tecno.tecnstock.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    // LOGIN
    @PostMapping("/login")
    public Object login(@RequestBody Usuario request) {

        Usuario user = service.login(request.getCodigo(), request.getSenha());

        if (user != null) {
            return user;
        }

        Map<String, String> erro = new HashMap<>();
        erro.put("erro", "Usuário ou senha inválidos");

        return erro;
    }

    // LISTAR
    @GetMapping
    public List<Usuario> listar() {
        return service.listar();
    }

    // BUSCAR
    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable Integer id) {
        return service.buscarPorId(id);
    }

    // CADASTRAR
    @PostMapping("/cadastrar")
    public Usuario cadastrar(@RequestBody Usuario usuario) {
        return service.cadastrar(usuario);
    }

    //teste
    @GetMapping("/teste")
    public String teste(){
        return "ok";
    }
    // ATUALIZAR
    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Integer id,
                             @RequestBody Usuario usuario) {
        return service.atualizar(id, usuario);
    }

    // DELETAR
    @DeleteMapping("/{id}")
    public String deletar(@PathVariable Integer id) {
        service.deletar(id);
        return "Usuário deletado com sucesso";
    }
}