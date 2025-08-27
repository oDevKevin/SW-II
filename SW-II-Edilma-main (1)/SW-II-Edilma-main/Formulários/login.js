// login.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Por favor, insira um e-mail válido.");
    event.preventDefault();
    return;
  }

  if (senha.length === 0) {
    alert("Por favor, insira sua senha.");
    event.preventDefault();
    return;
  }
});

