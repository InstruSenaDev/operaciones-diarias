// validations.js

// Función para validar el formulario
export function validationOperationForm(operation) {
  const errors = {};

  // Validar fecha (asegúrate de que sea una fecha válida)
  if (!operation.fecha) {
    errors.fecha = 'La fecha es obligatoria.';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(operation.fecha)) {
    errors.fecha = 'La fecha debe estar en el formato AAAA-MM-DD.';
  }

  // Validar tipo
  if (!operation.tipo) {
    errors.tipo = 'El tipo es obligatorio.';
  }

  // Validar descripción
  if (!operation.descripcion) {
    errors.descripcion = 'La descripción es obligatoria.';
  }

  // Validar monto (debe ser un número positivo)
  if (!operation.monto) {
    errors.monto = 'El monto es obligatorio.';
  } else if (isNaN(operation.monto) || parseFloat(operation.monto) <= 0) {
    errors.monto = 'El monto debe ser un número positivo.';
  }

  // Validar número de recibo
  if (!operation.numeroRecibo) {
    errors.numeroRecibo = 'El número de recibo es obligatorio.';
  }

  return errors;
}

// Función para verificar si el formulario es válido
export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}
