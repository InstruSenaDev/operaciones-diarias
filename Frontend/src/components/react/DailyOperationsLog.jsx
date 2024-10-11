import React from 'react';
import useDailyOperations from '../../../hooks/useDailyOperations.js'; // Ajusta la ruta según la ubicación de tu hook

const DailyOperationsLog = ({ idUsuario }) => {  // idUsuario se pasa como prop
  const {
    operation,
    operationsList,
    errors,
    handleChange,
    handleSubmit,
  } = useDailyOperations(idUsuario); // Ahora se pasa idUsuario al hook

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Registro de Operaciones Diarias</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="fecha"
                  name="fecha"
                  value={operation.fecha}
                  onChange={handleChange}
                  className={`block w-full p-2 border ${errors.fecha ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Tipo</label>
                <select
                  name="tipo"
                  value={operation.tipo}
                  onChange={handleChange}
                  className={`block w-full p-2 border ${errors.tipo ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="INGRESO">Ingreso</option>
                  <option value="EGRESO">Egreso</option>
                  <option value="COMPRA">Compra</option>
                  <option value="GASTOS">Gastos</option>
                  <option value="VENTA">Venta</option>
                  <option value="INGRESO_MENOR">Ingreso Menor</option>
                </select>
                {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Descripción</label>
              <input
                type="text"
                name="descripcion"
                value={operation.descripcion}
                onChange={handleChange}
                className={`block w-full p-2 border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Monto</label>
                <input
                  type="number"
                  name="monto"
                  value={operation.monto}
                  onChange={handleChange}
                  className={`block w-full p-2 border ${errors.monto ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.monto && <p className="text-red-500 text-sm">{errors.monto}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Número de Recibo</label>
                <input
                  type="text"
                  name="numeroRecibo"
                  value={operation.numeroRecibo}
                  onChange={handleChange}
                  className={`block w-full p-2 border ${errors.numeroRecibo ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.numeroRecibo && <p className="text-red-500 text-sm">{errors.numeroRecibo}</p>}
              </div>
            </div>
            <button type="submit" className="w-full p-2 bg-green-400 text-white rounded-md hover:bg-green-600">
              Registrar Operación
            </button>
          </form>

          <h2 className="mt-8 text-xl font-bold">Lista de Operaciones</h2>
          <ul className="mt-4 space-y-2">
            {operationsList.map((op) => (
              <li key={op.id} className="p-4 bg-gray-200 rounded-md">
                <p><strong>Fecha:</strong> {new Date(op.fecha).toLocaleDateString()}</p>
                <p><strong>Tipo:</strong> {op.tipo}</p>
                <p><strong>Descripción:</strong> {op.descripcion}</p>
                <p><strong>Monto:</strong> {op.monto}</p>
                <p><strong>Número de Recibo:</strong> {op.numero_recibo}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DailyOperationsLog;
