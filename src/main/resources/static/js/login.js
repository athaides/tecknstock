async function login() {
  const codigo = document.getElementById("codigo").value;
  const senha = document.getElementById("senha").value;

  const res = await fetch("http://localhost:8080/api/usuarios/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ codigo, senha })
  });

  const data = await res.json();

  if (data.codigo) {
    localStorage.setItem("usuario", JSON.stringify(data));
    window.location.href = "produtos.html";
  } else {
    document.getElementById("erro").innerText = data.erro;
  }
}