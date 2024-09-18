import React, { useState, useEffect } from "react";

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

  // Validar y manejar cambios de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    let numericValue = value;

    // Asegurarse de que los valores sean números positivos o vacíos
    if (["ingresosMenores", "egresos", "compras", "gastos"].includes(name)) {
      numericValue = value === "" ? "" : Math.max(0, Number(value));
    }

    setForm({
      ...form,
      [name]: numericValue
    });
  };

  // Calcular el total automáticamente
  useEffect(() => {
    const total =
      Number(form.ingresosMenores || 0) +
      Number(form.egresos || 0) +
      Number(form.compras || 0) +
      Number(form.gastos || 0);
      
    setForm((prevForm) => ({
      ...prevForm,
      total: total
    }));
  }, [form.ingresosMenores, form.egresos, form.compras, form.gastos]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Libro</h1>

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
          </div>

          <div>
            <label className="block font-semibold mb-2">Número de Recibo</label>
            <input
              type="text"
              name="numeroRecibo"
              value={form.numeroRecibo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Número de Recibo"
            />
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
          </div>

          <div>
            <label className="block font-semibold mb-2">Total</label>
            <input
              type="number"
              name="total"
              value={form.total}
              readOnly
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
              placeholder="Total"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibroOperaciones;
