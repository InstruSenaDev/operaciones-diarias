import React, { useState } from "react";

const LibroOperaciones = () => {
  const [form, setForm] = useState({
    ingresosMenores: "",
    egresos: "",
    compras: "",
    gastos: "",
    conceptoGasto: "",
    numeroRecibo: "",
    ingresoTotal: "",
    total: ""
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación mientras el usuario escribe
    if (value < 0) {
      setErrors({
        ...errors,
        [name]: "El valor no puede ser negativo."
      });
    } else {
      // Limpiar el error si el valor es válido
      setErrors({
        ...errors,
        [name]: ""
      });
    }

    // Actualizar el valor en el formulario
    setForm({
      ...form,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validación de campos vacíos y números negativos
    Object.keys(form).forEach((field) => {
      if (form[field] === "") {
        newErrors[field] = "Este campo es obligatorio.";
      } else if (Number(form[field]) < 0) {
        newErrors[field] = "El valor no puede ser negativo.";
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Si no hay errores, mostrar el modal
      setModalMessage("Formulario enviado con éxito.");
      setShowModal(true);
      setErrors({});
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Libro</h1>

        <form onSubmit={handleSubmit}>
          {/* Primera fila: Ingresos Menores y Egresos */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-2">Ingresos Menores</label>
              <input
                type="number"
                name="ingresosMenores"
                value={form.ingresosMenores}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Ingresos Menores"
              />
              {errors.ingresosMenores && (
                <p className="text-red-500 text-sm mt-1">{errors.ingresosMenores}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2">Egresos</label>
              <input
                type="number"
                name="egresos"
                value={form.egresos}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Egresos"
              />
              {errors.egresos && (
                <p className="text-red-500 text-sm mt-1">{errors.egresos}</p>
              )}
            </div>
          </div>

          {/* Segunda fila: Compras y Gastos */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-2">Compras</label>
              <input
                type="number"
                name="compras"
                value={form.compras}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Compras"
              />
              {errors.compras && (
                <p className="text-red-500 text-sm mt-1">{errors.compras}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2">Gastos</label>
              <input
                type="number"
                name="gastos"
                value={form.gastos}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Gastos"
              />
              {errors.gastos && (
                <p className="text-red-500 text-sm mt-1">{errors.gastos}</p>
              )}
            </div>
          </div>

          {/* Tercera fila: Concepto de Gasto y Número de Recibo */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-2">Concepto de Gasto</label>
              <input
                type="text"
                name="conceptoGasto"
                value={form.conceptoGasto}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Concepto de Gasto"
              />
              {errors.conceptoGasto && (
                <p className="text-red-500 text-sm mt-1">{errors.conceptoGasto}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2">Número de Recibo</label>
              <input
                type="number"
                name="numeroRecibo"
                value={form.numeroRecibo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Número de Recibo"
              />
              {errors.numeroRecibo && (
                <p className="text-red-500 text-sm mt-1">{errors.numeroRecibo}</p>
              )}
            </div>
          </div>

          {/* Cuarta fila: Ingreso Total y Total */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-semibold mb-2">Ingreso Total</label>
              <input
                type="number"
                name="ingresoTotal"
                value={form.ingresoTotal}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Ingreso Total"
              />
              {errors.ingresoTotal && (
                <p className="text-red-500 text-sm mt-1">{errors.ingresoTotal}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2">Total</label>
              <input
                type="number"
                name="total"
                value={form.total}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Total"
              />
              {errors.total && (
                <p className="text-red-500 text-sm mt-1">{errors.total}</p>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Mensaje</h2>
            <p>{modalMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibroOperaciones;
