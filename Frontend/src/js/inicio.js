
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
