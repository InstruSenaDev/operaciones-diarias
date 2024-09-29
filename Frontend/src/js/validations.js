const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/operaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operacion), // Asegúrate de que "operacion" está bien definido
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
      fetchOperations(); // Actualiza la lista de operaciones
    } else {
      console.error('Error al agregar operación:', response.statusText);
    }
  } catch (error) {
    console.error('Error al agregar operación:', error);
  }
};
