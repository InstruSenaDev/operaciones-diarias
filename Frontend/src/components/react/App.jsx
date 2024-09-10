import React, { useState, useCallback, useEffect } from 'react';

const Navbar = () => (
  <nav className="bg-green-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white font-bold text-xl">LROD Admin</div>
      <div>
        <a href="#" className="text-white mr-4 hover:underline">Inicio</a>
        <a href="#" className="text-white mr-4 hover:underline">Usuarios</a>
        <a href="#" className="text-white hover:underline">Configuración</a>
      </div>
    </div>
  </nav>
);

const Header = () => (
  <header className="bg-white shadow">
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
    </div>
  </header>
);

const Card = ({ id, title, content, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardContent, setCardContent] = useState(content);

  const toggleEdit = useCallback(() => {
    if (isEditing) {
      onUpdate(id, cardContent);
    }
    setIsEditing(!isEditing);
  }, [isEditing, id, cardContent, onUpdate]);

  const handleContentChange = useCallback((index, newValue) => {
    setCardContent(prevContent => 
      prevContent.map((item, i) => 
        i === index ? { ...item, value: newValue } : item
      )
    );
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {cardContent.map((item, index) => (
        <p key={index} className={`${item.color || "text-gray-600"} mb-2`}>
          {item.label}:{' '}
          {isEditing ? (
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleContentChange(index, e.target.value)}
              className="border-b border-gray-300 focus:border-green-500 outline-none"
            />
          ) : (
            <span>{item.value}</span>
          )}
        </p>
      ))}
      <button 
        onClick={toggleEdit} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        {isEditing ? 'Guardar' : 'Editar'}
      </button>
    </div>
  );
};

const Table = ({ apprentices, editApprentice, deleteApprentice }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b text-left">Nombre</th>
          <th className="py-2 px-4 border-b text-left">Email</th>
          <th className="py-2 px-4 border-b text-left">Curso</th>
          <th className="py-2 px-4 border-b text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {apprentices.map(apprentice => (
          <tr key={apprentice.id}>
            <td className="py-2 px-4 border-b">{apprentice.name}</td>
            <td className="py-2 px-4 border-b">{apprentice.email}</td>
            <td className="py-2 px-4 border-b">{apprentice.course}</td>
            <td className="py-2 px-4 border-b">
              <button onClick={() => editApprentice(apprentice.id)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 mr-2">
                Editar
              </button>
              <button onClick={() => deleteApprentice(apprentice.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Form = ({ addApprentice }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: ''
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    addApprentice(formData);
    setFormData({ name: '', email: '', course: '' });
  }, [formData, addApprentice]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="course" className="block text-sm font-medium text-gray-700">Curso</label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
        >
          <option value="">Seleccione un curso</option>
          <option value="Frontend">Desarrollo Frontend</option>
          <option value="Backend">Desarrollo Backend</option>
          <option value="Full Stack">Desarrollo Full Stack</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
      >
        Registrar Aprendiz
      </button>
    </form>
  );
};

const AdminDashboard = () => {
  const [apprentices, setApprentices] = useState([]);
  const [cards, setCards] = useState([
    { id: 'summary-card', title: "Resumen de Operaciones", content: [
      { label: "Total de transacciones hoy", value: "0" },
      { label: "Ingresos del día", value: "$0" }
    ]},
    { id: 'users-card', title: "Usuarios Activos", content: [
      { label: "Total de usuarios", value: "0" },
      { label: "Nuevos hoy", value: "0" }
    ]},
    { id: 'alerts-card', title: "Alertas", content: [
      { label: "Transacciones sospechosas", value: "0", color: "text-red-500" },
      { label: "Usuarios pendientes de verificación", value: "0", color: "text-yellow-500" }
    ]}
  ]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      // In a real application, you would fetch data from your API here
      const mockApprentices = [
        { id: 1, name: "Ana García", email: "ana@example.com", course: "Frontend" },
        { id: 2, name: "Carlos López", email: "carlos@example.com", course: "Backend" },
        { id: 3, name: "María Rodríguez", email: "maria@example.com", course: "Full Stack" }
      ];
      setApprentices(mockApprentices);
    };

    fetchData();
  }, []);

  const addApprentice = useCallback((apprentice) => {
    setApprentices(prevApprentices => [...prevApprentices, { ...apprentice, id: Date.now() }]);
    alert('Aprendiz registrado con éxito!');
  }, []);

  const editApprentice = useCallback((id) => {
    // Implement edit logic here
    alert(`Editando aprendiz con ID: ${id}`);
  }, []);

  const deleteApprentice = useCallback((id) => {
    setApprentices(prevApprentices => prevApprentices.filter(a => a.id !== id));
    alert('Aprendiz eliminado');
  }, []);

  const updateCard = useCallback((id, newContent) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, content: newContent } : card
      )
    );
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Header />
      <main className="container mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => (
            <Card key={card.id} {...card} onUpdate={updateCard} />
          ))}
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Aprendices Registrados</h2>
          <Table apprentices={apprentices} editApprentice={editApprentice} deleteApprentice={deleteApprentice} />
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Registrar Aprendiz</h2>
          <Form addApprentice={addApprentice} />
        </div>
      </main>
      <footer className="bg-green-500 text-white mt-12 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Libro De Operaciones Diarias. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;