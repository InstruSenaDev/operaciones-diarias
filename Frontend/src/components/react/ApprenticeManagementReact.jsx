// ApprenticeManagementReact.jsx
import React, { useState, useEffect } from 'react';

export function ApprenticeManagementReact() {
  const [apprentices, setApprentices] = useState([
    { id: 1, name: "Ana García", email: "ana@example.com", course: "Frontend" },
    { id: 2, name: "Carlos López", email: "carlos@example.com", course: "Backend" },
    { id: 3, name: "María Rodríguez", email: "maria@example.com", course: "Full Stack" }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [activeTime, setActiveTime] = useState(0);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newApprentice = {
      id: apprentices.length > 0 ? Math.max(...apprentices.map(a => a.id)) + 1 : 1,
      name: formData.get('name'),
      email: formData.get('email'),
      course: formData.get('course')
    };
    setApprentices([...apprentices, newApprentice]);
    e.target.reset();
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Aprendices</h1>
        <div className="relative">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Configuración
          </button>
          {showConfig && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ver Perfil</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Modificar Perfil</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Salir</a>
                <div className="px-4 py-2 text-sm text-gray-700">Activo: {formatTime(activeTime)}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Curso</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {apprentices.map((apprentice) => (
            <tr key={apprentice.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{apprentice.name}</td>
              <td className="py-3 px-6 text-left">{apprentice.email}</td>
              <td className="py-3 px-6 text-center">{apprentice.course}</td>
              <td className="py-3 px-6 text-center">
                <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2">Editar</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2 className="text-xl font-semibold mb-4">Registrar Nuevo Aprendiz</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Curso</label>
            <select id="course" name="course" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option value="Frontend">Desarrollo Frontend</option>
              <option value="Backend">Desarrollo Backend</option>
              <option value="Full Stack">Desarrollo Full Stack</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Registrar Aprendiz</button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Aprendiz Registrado</h2>
            <p>El aprendiz ha sido registrado con éxito.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}