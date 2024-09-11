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

    function togglePasswordVisibility(inputElement, toggleButton) {
        if (toggleButton) {
            toggleButton.addEventListener('click', function() {
                const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
                inputElement.setAttribute('type', type);
            });
        }
    }

    togglePasswordVisibility(contrasenaRegistro, togglePasswordRegistro);
    togglePasswordVisibility(confirmarContrasena, togglePasswordConfirmacion);

    function showError(element, message) {
        element.textContent = message;
    }

    if (formu) {
        formu.addEventListener('submit', async function(event) {
            event.preventDefault(); // Evitar el comportamiento por defecto del formulario
            let valid = true;

            [nombreError, correoError, contrasenaError, confirmarContrasenaError, numeroDcError].forEach(el => el.textContent = '');

            const nombreValue = nombre.value.trim();
            if (!nombreValue) {
                valid = false;
                showError(nombreError, 'Ingrese un nombre válido.');
            }

            const correoValue = correoRegistro.value.trim();
            if (!correoValue) {
                valid = false;
                showError(correoError, 'El correo electrónico es requerido.');
            } else if (!/\S+@\S+\.\S+/.test(correoValue)) {
                valid = false;
                showError(correoError, 'El correo electrónico debe tener formato válido.');
            }

            const contrasenaValue = contrasenaRegistro.value;
            if (!contrasenaValue || contrasenaValue.length < 8 || !/[A-Z]/.test(contrasenaValue)) {
                valid = false;
                if (!contrasenaValue) {
                    showError(contrasenaError, 'La contraseña es requerida.');
                } else if (contrasenaValue.length < 8) {
                    showError(contrasenaError, 'La contraseña debe tener al menos 8 caracteres.');
                } else if (!/[A-Z]/.test(contrasenaValue)) {
                    showError(contrasenaError, 'La contraseña debe contener al menos una letra mayúscula.');
                }
            }

            const confirmarContrasenaValue = confirmarContrasena.value;
            if (contrasenaValue !== confirmarContrasenaValue) {
                valid = false;
                showError(confirmarContrasenaError, 'Las contraseñas no coinciden.');
            }

            const numeroDcValue = numeroDc.value.trim();
            if (!numeroDcValue || isNaN(parseInt(numeroDcValue)) || numeroDcValue.length !== 10) {
                valid = false;
                showError(numeroDcError, 'Ingrese un número de documento válido de 10 dígitos.');
            }

            if (!valid) {
                return;
            }

            const idrol = '1';
            const formData = {
                'nombre': nombreValue,
                'correo': correoValue,
                'contraseña': contrasenaValue,
                'documento': numeroDcValue,
                 'rol': idrol,
            };

            try {

                            // Enviar la solicitud para enviar el código de verificación al correo del usuario
                            const response = await fetch('http://localhost:4000/api/register', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ formData }),
                            });
            
                            if (response.ok) {
                               
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

    window.addEventListener('pageshow', function(event) {
        if (event.persisted && formu) {
            formu.reset();
        }
    });
});
