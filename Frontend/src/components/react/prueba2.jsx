import { useState } from 'react';
import { Divider, TextInput } from '@tremor/react';

export default function Example() {
  const [errors, setErrors] = useState({});

  const validateForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const errors = {};

    // Validar Fecha
    const dia = parseInt(formData.get('dia'));
    const mes = parseInt(formData.get('mes'));

    if (isNaN(dia) || dia < 1 || dia > 31) {
      errors.dia = 'Por favor ingresa un día válido entre 1 y 31.';
    }

    if (isNaN(mes) || mes < 1 || mes > 12) {
      errors.mes = 'Por favor ingresa un mes válido entre 1 y 12.';
    }

    // Validar Ingresos
    const ingresos = parseFloat(formData.get('ingresos'));
    if (isNaN(ingresos) || ingresos < 0) {
      errors.ingeros = 'Por favor ingresa un valor positivo para los ingresos.';
    }

    // Validar Egresos (Opcional)
    // const egresos = parseFloat(formData.get('address'));
    // if (isNaN(egresos) || egresos < 0) {
    //   errors.egresos = 'Por favor ingresa un valor positivo para los egresos.';
    // }

    setErrors(errors);

    // Si no hay errores, enviar el formulario
    if (Object.keys(errors).length === 0) {
      event.target.submit();
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:max-w-5xl">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong text-center text-3xl font-bold drop-shadow-lg">
          Registro
        </h3>
        <form onSubmit={validateForm} className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
               
              </label>
              <TextInput
                type="number"
                id="fecha"
                name="dia"
                placeholder="Día"
                className="mt-2"
                required
              />
              {errors.dia && <p className="text-red-500">{errors.dia}</p>}
            </div>

            <div className="col-span-full sm:col-span-3">
  <label
    htmlFor="mes"
    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
  >
    
  </label>
  <select
    id="mes"
    name="mes"
    className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    required
  >
    <option value="">Selecciona un mes</option>
    <option value="1">Enero</option>
    <option value="2">Febrero</option>
    <option value="3">Marzo</option>
    <option value="4">Abril</option>
    <option value="5">Mayo</option>
    <option value="6">Junio</option>
    <option value="7">Julio</option>
    <option value="8">Agosto</option>
    <option value="9">Septiembre</option>
    <option value="10">Octubre</option>
    <option value="11">Noviembre</option>
    <option value="12">Diciembre</option>
  </select>
              
            </div>

            <div className="col-span-full">
              <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Ingresos
              </label>
              <TextInput
                type="number"
                id="ingresos"
                name="ingresos"
                placeholder="Ventas O Servicios"
                className="mt-2"
                required
              />
              {errors.ingeros && <p className="text-red-500">{errors.ingeros}</p>}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="address"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Egresos
              </label>
              <TextInput
                type="text"
                id="address"
                name="egresos"
                placeholder="Compras"
                className="mt-2"
              />
            </div>
          </div>
          <Divider />
          
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-white-tremor-content-strong bg-green-300 text-white font-bold py-2 px-4 rounded shadow-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-white-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis bg-green-400 text-white font-bold py-2 px-4 rounded shadow-md"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}