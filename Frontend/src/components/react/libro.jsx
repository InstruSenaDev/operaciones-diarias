import React, { useState, useEffect } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validar que los campos no sean negativos
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (!isNaN(value)) {
      const newValue = value >= 0 ? value : ""; // Evitar números negativos
      setForm({
        ...form,
        [name]: newValue
      });
    }
  };

  // Calcular el total automáticamente
  useEffect(() => {
    const totalSum = 
      Number(form.ingresosMenores || 0) +
      Number(form.egresos || 0) +
      Number(form.compras || 0) +
      Number(form.gastos || 0);
      
    setForm((prevForm) => ({
      ...prevForm,
      total: totalSum.toFixed(2) // Actualizar el total
    }));
  }, [form.ingresosMenores, form.egresos, form.compras, form.gastos]);

  // Manejar el registro
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    // Aquí puedes agregar la lógica para registrar los datos
    console.log("Datos registrados:", form);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Libro</h1>

        <form onSubmit={handleSubmit}>
          {/* First Row: Ingresos Menores and Egresos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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

          {/* Second Row: Compras and Gastos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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

          {/* Third Row: Concepto de Gasto and Número de Recibo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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

          {/* Fourth Row: Ingreso Total and Total */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
                type="text"
                name="total"
                value={form.total}
                readOnly
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Total"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Registrar
            </button>
          </div>
        </form>

        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Registro Exitoso</AlertDialogTitle>
              <AlertDialogDescription>
                Los datos han sido registrados correctamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsModalOpen(false)}>Aceptar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default LibroOperaciones;