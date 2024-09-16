// src/utils/validations.js

export const validateOperationForm = (operation) => {
    const errors = {};
  
    if (!operation.fecha) {
      errors.fecha = 'La fecha es requerida';
    }
  
    if (!operation.tipo) {
      errors.tipo = 'El tipo es requerido';
    }
  
    if (!operation.descripcion) {
      errors.descripcion = 'La descripción es requerida';
    }
  
    if (!operation.monto) {
      errors.monto = 'El monto es requerido';
    } else if (isNaN(operation.monto) || parseFloat(operation.monto) < 0) {
      errors.monto = 'El monto debe ser un número positivo';
    }
  
    if (!operation.numeroRecibo) {
      errors.numeroRecibo = 'El número de recibo es requerido';
    }
  
    return errors;
  };
  
  export const isFormValid = (errors) => {
    return Object.keys(errors).length === 0;
  };