const loginForm = document.getElementById('loginForm');
const usuarioInput = document.getElementById('usuario');
const contrasenaInput = document.getElementById('contrasena');
const usuarioError = document.getElementById('usuarioError');
const contrasenaError = document.getElementById('contrasenaError');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;

  // Resetear mensajes de error
  usuarioError.classList.add('hidden');
  contrasenaError.classList.add('hidden');
  loginError.classList.add('hidden');

  // Validar correo electrónico
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!usuarioInput.value || !emailPattern.test(usuarioInput.value)) {
    usuarioError.classList.remove('hidden');
    isValid = false;
  }

  // Validar contraseña
  if (contrasenaInput.value.length < 8) {
    contrasenaError.classList.remove('hidden');
    isValid = false;
  }

  // Aquí podrías validar la contraseña contra una base de datos o una lista de contraseñas válidas
  const validPassword = "contraseñaCorrecta"; // Cambia esto a la contraseña válida

  if (isValid) {
    if (contrasenaInput.value !== validPassword) {
      loginError.classList.remove('hidden');
    } else {
      // Lógica para iniciar sesión
      alert("Inicio de sesión exitoso");
    }
  }
});

      document
        .getElementById("loginForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          const usuario = document.getElementById("usuario").value;
          const contrasena = document.getElementById("contrasena").value;

          const usuarioError = document.getElementById("usuarioError");
          const contrasenaError = document.getElementById("contrasenaError");

          let valido = true;

          // Validación del correo electrónico
          if (!usuario.includes("@")) {
            usuarioError.classList.remove("hidden");
            valido = false;
          } else {
            usuarioError.classList.add("hidden");
          }

          // Validación de la contraseña
          if (contrasena.length < 8) {
            contrasenaError.classList.remove("hidden");
            valido = false;
          } else {
            contrasenaError.classList.add("hidden");
          }

          // Si es válido, envía el formulario
          if (valido) {
            document.getElementById("loginForm").submit();
          }
        });
