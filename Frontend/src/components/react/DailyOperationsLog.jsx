import React, { useState, useEffect } from 'react';
import { validateOperationForm, isFormValid } from '../../js/validations';

const DailyOperationsLog = () => {
  const [operation, setOperation] = useState({
    fecha: '',
    tipo: '',
    descripcion: '',
    monto: '',
    numeroRecibo: '',
  });

  const [operationsList, setOperationsList] = useState([]);

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchOperations = async () => {
    try {
      const response = await axios.get('/api/operaciones');
      setOperationsList(response.data);
    } catch (error) {
      console.error('Error al obtener operaciones:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperation({
      ...operation,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/operaciones', operation);
      setOperation({
        fecha: '',
        tipo: '',
        descripcion: '',
        monto: '',
        numeroRecibo: '',
      });
      fetchOperations();
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
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={operation.fecha}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <input
                  type="text"
                  name="tipo"
                  value={operation.tipo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={operation.descripcion}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monto</label>
                <input
                  type="number"
                  name="monto"
                  value={operation.monto}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de Recibo</label>
                <input
                  type="text"
                  name="numeroRecibo"
                  value={operation.numeroRecibo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
              Agregar Operación
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Operaciones Registradas</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2 text-left">Fecha</th>
                <th className="border p-2 text-left">Tipo</th>
                <th className="border p-2 text-left">Descripción</th>
                <th className="border p-2 text-left">Monto</th>
                <th className="border p-2 text-left">Número de Recibo</th>
              </tr>
            </thead>
            <tbody>
              {operationsList.map((op, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border p-2">{op.fecha}</td>
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
  );
};

export default DailyOperationsLog;