// src/components/DailyOperationsLog.jsx
import React, { useState } from 'react';

const DailyOperationsLog = () => {
  const [operation, setOperation] = useState({
    date: '',
    type: '',
    description: '',
    amount: '',
    receiptNumber: '', // Nuevo campo para el número de recibo
  });

  const [operationsList, setOperationsList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperation({
      ...operation,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOperationsList([...operationsList, operation]);
    setOperation({
      date: '',
      type: '',
      description: '',
      amount: '',
      receiptNumber: '', // Limpiar el número de recibo después de enviar
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Registro de Operaciones Diarias</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha</label>
              <input
                type="date"
                name="date"
                value={operation.date}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <input
                type="text"
                name="type"
                value={operation.type}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <input
                type="text"
                name="description"
                value={operation.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monto</label>
              <input
                type="number"
                name="amount"
                value={operation.amount}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de Recibo</label>
              <input
                type="text"
                name="receiptNumber"
                value={operation.receiptNumber}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300">
            Agregar Operación
          </button>
        </form>

        {/* Contenedor separado para la tabla */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Operaciones Registradas</h2>
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
                  <td className="border p-2">{op.date}</td>
                  <td className="border p-2">{op.type}</td>
                  <td className="border p-2">{op.description}</td>
                  <td className="border p-2">{op.amount}</td>
                  <td className="border p-2">{op.receiptNumber}</td>
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
