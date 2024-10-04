import { useState, useEffect } from 'react';

const useDailyOperations = () => {
  const [operation, setOperation] = useState({
    fecha: '',
    tipo: '',
    descripcion: '',
    monto: '',
    numeroRecibo: '',
  });

  const [operationsList, setOperationsList] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchOperations = async () => {
    try {
      const response = await fetch('/api/libro'); // Ruta ajustada a tu tabla 'libro'
      const data = await response.json();
      setOperationsList(data);
    } catch (error) {
      console.error('Error al obtener operaciones:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperation({ ...operation, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    const currentDate = new Date().toISOString().split('T')[0]; // Fecha actual en formato 'YYYY-MM-DD'

    // Validaciones
    if (!operation.fecha) {
      newErrors.fecha = 'La fecha es requerida.';
    } else if (operation.fecha > currentDate) {
      newErrors.fecha = 'La fecha no puede ser futura.';
    }

    if (!operation.tipo) {
      newErrors.tipo = 'El tipo de operación es requerido.';
    } else if (!['INGRESO', 'EGRESO', 'COMPRA', 'GASTOS', 'VENTA', 'INGRESO_MENOR'].includes(operation.tipo)) {
      newErrors.tipo = 'El tipo de operación no es válido.';
    }

    if (!operation.descripcion) {
      newErrors.descripcion = 'La descripción es requerida.';
    }

    if (!operation.monto) {
      newErrors.monto = 'El monto es requerido.';
    } else if (operation.monto <= 0) {
      newErrors.monto = 'El monto debe ser mayor que cero.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return; // Si hay errores, no continúa
    }

    try {
      const response = await fetch('/api/libro', { // Ruta ajustada a tu tabla 'libro'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(operation),
      });

      if (response.ok) {
        const nuevaOperacion = await response.json();
        setOperation({
          fecha: '',
          tipo: '',
          descripcion: '',
          monto: '',
          numeroRecibo: '',
        });
        fetchOperations(); // Actualizar lista de operaciones
      } else {
        console.error('Error al agregar operación:', await response.text());
      }
    } catch (error) {
      console.error('Error al agregar operación:', error);
    }
  };

  return {
    operation,
    operationsList,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useDailyOperations;
