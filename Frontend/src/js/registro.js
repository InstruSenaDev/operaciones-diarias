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

    // Definir idrol por si lo necesitas en otros lados.
    const idrol = 1; // Ajusta según sea necesario

    // Función para mostrar u ocultar la contraseña
    if (togglePasswordRegistro) {
        togglePasswordRegistro.addEventListener('click', function() {
            if (contrasenaRegistro) {
                const type = contrasenaRegistro.getAttribute('type') === 'password' ? 'text' : 'password';
                contrasenaRegistro.setAttribute('type', type);
            }
        });
    }

    if (togglePasswordConfirmacion) {
        togglePasswordConfirmacion.addEventListener('click', function() {
            if (confirmarContrasena) {
                const type = confirmarContrasena.getAttribute('type') === 'password' ? 'text' : 'password';
                confirmarContrasena.setAttribute('type', type);
            }
        });
    }

    // Validación del formulario al enviar
    if (formu) {
        formu.addEventListener('submit', async function(event) {
            event.preventDefault(); // Evitar el comportamiento por defecto del formulario
            let valid = true;

            // Limpiar mensajes de error
            if (nombreError) nombreError.textContent = '';
            if (correoError) correoError.textContent = '';
            if (contrasenaError) contrasenaError.textContent = '';
            if (confirmarContrasenaError) confirmarContrasenaError.textContent = '';
            if (numeroDcError) numeroDcError.textContent = '';

            // Validación del nombre
            const nombreValue = nombre ? nombre.value.trim() : '';
            if (!nombreValue) {
                valid = false;
                if (nombreError) nombreError.textContent = 'Ingrese un nombre válido.';
            }

            // Validación del correo electrónico
            const correoValue = correoRegistro ? correoRegistro.value.trim() : '';
            if (!correoValue) {
                valid = false;
                if (correoError) correoError.textContent = 'El correo electrónico es requerido.';
            } else if (!/\S+@\S+\.\S+/.test(correoValue)) {
                valid = false;
                if (correoError) correoError.textContent = 'El correo electrónico debe tener formato válido.';
            }

            // Validación de la contraseña
            const contrasenaValue = contrasenaRegistro ? contrasenaRegistro.value : '';
            if (!contrasenaValue || contrasenaValue.length < 8 || !/[A-Z]/.test(contrasenaValue)) {
                valid = false;
                if (!contrasenaValue) {
                    if (contrasenaError) contrasenaError.textContent = 'La contraseña es requerida.';
                } else if (contrasenaValue.length < 8) {
                    if (contrasenaError) contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
                } else if (!/[A-Z]/.test(contrasenaValue)) {
                    if (contrasenaError) contrasenaError.textContent = 'La contraseña debe contener al menos una letra mayúscula.';
                }
            }

            // Validación de la confirmación de contraseña
            const confirmarContrasenaValue = confirmarContrasena ? confirmarContrasena.value : '';
            if (contrasenaValue !== confirmarContrasenaValue) {
                valid = false;
                if (confirmarContrasenaError) confirmarContrasenaError.textContent = 'Las contraseñas no coinciden.';
            }

            // Validación del número de documento
            const numeroDcValue = numeroDc ? numeroDc.value.trim() : '';
            if (!numeroDcValue || isNaN(parseInt(numeroDcValue)) || numeroDcValue.length !== 10) {
                valid = false;
                if (numeroDcError) numeroDcError.textContent = 'Ingrese un número de documento válido de 10 dígitos.';
            }

            if (!valid) {
                return;
            }

            console.log('Datos enviados:', {
                nombre: nombreValue,
                correo: correoValue,
                contraseña: contrasenaValue,
                numeroDocumento: numeroDcValue,
                idrol: idrol
            });

            // Enviar los datos al servidor si todo es valido
            try {
                const response = await fetch('/api/registro', { // URL completa al servidor backend
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombrecompleta: nombreValue,
                        correo: correoValue,
                        contraseña: contrasenaValue,
                        Ndedocumento: numeroDcValue,
                        idrol: idrol, // Usar la constante idrol
                    }),
                });

                const result = await response.json();

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
