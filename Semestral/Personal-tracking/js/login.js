// Referencias al DOM
const loginForm = document.getElementById('loginForm');

// Manejo del formulario de login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  console.log('[LOGIN] Intento de login con:', { email, password });

  if (email === 'test@example.com' && password === 'password') {
    alert('Login exitoso');
    window.location.href = 'http://127.0.0.1:5500/Personal-tracking/dashboard.html';
  } else {
    emailInput.classList.add('error');
    passwordInput.classList.add('error');
    alert('Email o contraseña incorrectos');
  }
});

// Eliminar errores visuales al escribir
document.querySelectorAll('#email, #password').forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('error');
  });
});