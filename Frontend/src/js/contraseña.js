document.getElementById('togglePasswordRegistro').addEventListener('click', function () {
    const passwordInput = document.getElementById('contrasenaRegistro');
    const icon = document.getElementById('iconoRegistro');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Cambiar el icono según el estado
    icon.classList.toggle('bx-show');
    icon.classList.toggle('bx-hide');
});

document.getElementById('togglePasswordConfirmacion').addEventListener('click', function () {
    const confirmPasswordInput = document.getElementById('confirmarContrasena');
    const icon = document.getElementById('iconoConfirmacion');
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);

    // Cambiar el icono según el estado
    icon.classList.toggle('bx-show');
    icon.classList.toggle('bx-hide');
});