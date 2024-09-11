document.addEventListener('DOMContentLoaded', function() {
    const formu = document.getElementById('formu');
    const nombre = document.getElementById('registroNombre');
    const correoRegistro = document.getElementById('CorreoRegistro');
    const contrasenaRegistro = document.getElementById('contrasenaRegistro');
    const confirmarContrasena = document.getElementById('confirmarContrasena');
    const numeroDc = document.getElementById('numeroDc');
    const nombreError = document.getElementById('nombreError');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');
    const confirmarContrasenaError = document.getElementById('confirmarContrasenaError');
    const numeroDcError = document.getElementById('numeroDcError');
    const togglePasswordRegistro = document.getElementById('togglePasswordRegistro');
    const togglePasswordConfirmacion = document.getElementById('togglePasswordConfirmacion');

    // Función para mostrar u ocultar la contraseña
    if (togglePasswordRegistro) {
        togglePasswordRegistro.addEventListener('click', function() {
            const type = contrasenaRegistro.getAttribute('type') === 'password' ? 'text' : 'password';
            contrasenaRegistro.setAttribute('type', type);
        });
    }

    if (togglePasswordConfirmacion) {
        togglePasswordConfirmacion.addEventListener('click', function() {
            const type = confirmarContrasena.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmarContrasena.setAttribute('type', type);
        });
    }

    // Validación del formulario al enviar
    if (formu) {
        formu.addEventListener('submit', async function(event) {
            event.preventDefault(); // Evitar el comportamiento por defecto del formulario
            let valid = true;

            // Limpiar mensajes de error
            nombreError.textContent = '';
            correoError.textContent = '';
            contrasenaError.textContent = '';
            confirmarContrasenaError.textContent = '';
            numeroDcError.textContent = '';

            // Validación del nombre
            const nombreValue = nombre.value.trim();
            if (!nombreValue) {
                valid = false;
                nombreError.textContent = 'Ingrese un nombre válido.';
            }

            // Validación del correo electrónico
            const correoValue = correoRegistro.value.trim();
            if (!correoValue) {
                valid = false;
                correoError.textContent = 'El correo electrónico es requerido.';
            } else if (!/\S+@\S+\.\S+/.test(correoValue)) {
                valid = false;
                correoError.textContent = 'El correo electrónico debe tener formato válido.';
            }

            // Validación de la contraseña
            const contrasenaValue = contrasenaRegistro.value;
            if (!contrasenaValue || contrasenaValue.length < 8 || !/[A-Z]/.test(contrasenaValue)) {
                valid = false;
                if (!contrasenaValue) {
                    contrasenaError.textContent = 'La contraseña es requerida.';
                } else if (contrasenaValue.length < 8) {
                    contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
                } else if (!/[A-Z]/.test(contrasenaValue)) {
                    contrasenaError.textContent = 'La contraseña debe contener al menos una letra mayúscula.';
                }
            }

            // Validación de la confirmación de contraseña
            const confirmarContrasenaValue = confirmarContrasena.value;
            if (contrasenaValue !== confirmarContrasenaValue) {
                valid = false;
                confirmarContrasenaError.textContent = 'Las contraseñas no coinciden.';
            }

            // Validación del número de documento
            const numeroDcValue = numeroDc.value.trim();
            if (!numeroDcValue || isNaN(parseInt(numeroDcValue)) || numeroDcValue.length !== 10) {
                valid = false;
                numeroDcError.textContent = 'Ingrese un número de documento válido de 10 dígitos.';
            }

            // Si alguna validación falla, no envía el formulario
            if (!valid) {
                return;
            }

            // Definir la variable idrol, ya que es mencionada en el código
            const idrol = '1'; // Valor de ejemplo; ajusta según sea necesario

            console.log('datos de nombre', nombreValue);
            console.log('datos de correo', correoValue);
            console.log('datos de contraseña', contrasenaValue);
            console.log('datos de numero', numeroDcValue);
            console.log('datos de idrol', idrol); // Ahora idrol está definido

            // Enviar los datos al servidor si todo es válido
            try {
                console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', idrol); // Ahora idrol está definido
                const response = await fetch('/api/registro', { // URL completa al servidor backend
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                    body: JSON.stringify({
                        nombre: nombreValue,
                        correo: correoValue,
                        contraseña: contrasenaValue,
                        documento: numeroDcValue,
                        rol: idrol, // Enviar idrol en lugar de '1' como texto
                    }),
                    
                });
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', idrol); // Ahora idrol está definido
                // const result = await response.json();

                if (response.ok) {
                    // Redirigir al usuario a la página de inicio después del registro exitoso
                    window.location.href = '/inicio';
                } else {
                    console.error('Error en el registro:', result.error);
                    alert('Error en el registro: ' + result.error);
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                alert('Error al enviar la solicitud: ' + error.message);
            }
        });
    }

    // Función para resetear el formulario si se vuelve a cargar la página
    window.addEventListener('pageshow', function(event) {
        if (event.persisted && formu) {
            formu.reset();
        }
    });
});