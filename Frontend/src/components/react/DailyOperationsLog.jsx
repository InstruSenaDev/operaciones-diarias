import React, { useState, useEffect } from 'react';

const DailyOperationsLog = () => {
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
      const response = await fetch('/api/operaciones');
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

    // Validación de fecha
    if (!operation.fecha) {
      newErrors.fecha = 'La fecha es requerida.';
    } else if (operation.fecha > currentDate) {
      newErrors.fecha = 'La fecha no puede ser futura.';
    }

    // Validación de tipo
    if (!operation.tipo) {
      newErrors.tipo = 'El tipo de operación es requerido.';
    } else if (!['INGRESO', 'EGRESO', 'COMPRA', 'GASTOS', 'VENTA', 'INGRESO_MENOR'].includes(operation.tipo)) {
      newErrors.tipo = 'El tipo de operación no es válido.';
    }

    // Validación de descripción
    if (!operation.descripcion) {
      newErrors.descripcion = 'La descripción es requerida.';
    }

    // Validación de monto
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
      await fetch('/api/operaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(operation),
      });

      // Limpiar el formulario tras el envío
      setOperation({
        fecha: '',
        tipo: '',
        descripcion: '',
        monto: '',
        numeroRecibo: '',
      });
      setErrors({});
      fetchOperations(); // Actualizar lista de operaciones
    } catch (error) {
      console.error('Error al agregar operación:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Registro de Operaciones Diarias</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="fecha"
                  id="fecha"
                  name="fecha"
                  value={operation.fecha}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                  required
                />
                {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha}</p>}
              </div>
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={operation.tipo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="" disabled>Seleccione una opción</option>
                  <option value="INGRESO">INGRESO</option>
                  <option value="EGRESO">EGRESO</option>
                  <option value="COMPRA">COMPRA</option>
                  <option value="GASTOS">GASTOS</option>
                  <option value="VENTA">VENTA</option>
                  <option value="INGRESO_MENOR">INGRESO MENOR</option>
                </select>
                {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  value={operation.descripcion}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                  required
                />
                {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}
              </div>
              <div>
                <label htmlFor="monto" className="block text-sm font-medium text-gray-700">Monto</label>
                <input
                  type="number"
                  id="monto"
                  name="monto"
                  value={operation.monto}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                  required
                />
                {errors.monto && <p className="text-red-500 text-sm">{errors.monto}</p>}
              </div>
              <div>
                <label htmlFor="numeroRecibo" className="block text-sm font-medium text-gray-700">Número de Recibo</label>
                <input
                  type="number"
                  id="numeroRecibo"
                  name="numeroRecibo"
                  value={operation.numeroRecibo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
            <button type="submit" className="w-30 bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">Registrar Operación</button>
          </form>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Operaciones Registradas</h2>
            <table className="min-w-full mt-4 border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Fecha</th>
                  <th className="border p-2">Tipo</th>
                  <th className="border p-2">Descripción</th>
                  <th className="border p-2">Monto</th>
                  <th className="border p-2">Número de Recibo</th>
                </tr>
              </thead>
              <tbody>
                {operationsList.map((op, index) => (
                  <tr key={index} className="border-b">
                    <td className="border p-2">{new Date(op.fecha).toLocaleDateString()}</td>
                    <td className="border p-2">{op.tipo}</td>
                    <td className="border p-2">{op.descripcion}</td>
                    <td className="border p-2">{op.monto}</td>
                    <td className="border p-2">{op.numero_recibo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyOperationsLog;
