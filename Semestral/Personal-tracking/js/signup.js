// Referencias al DOM
const signupForm = document.getElementById('signupForm');

// Manejo del formulario de registro
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  console.log('[SIGNUP] Creando cuenta con:', { name, email, password });

  // Validaciones básicas
  if (!name || !email || !password) {
    if (!name) nameInput.classList.add('error');
    if (!email) emailInput.classList.add('error');
    if (!password) passwordInput.classList.add('error');
    alert('Todos los campos son obligatorios');
    return;
  }

  // Simulación de creación de cuenta
  alert('Cuenta creada con éxito');
  window.location.href = 'http://127.0.0.1:5500/Personal-tracking/dashboard.html';
});

// Eliminar errores visuales al escribir
document.querySelectorAll('#name, #email, #password').forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('error');
  });
});