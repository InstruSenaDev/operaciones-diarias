var clic = 1;
const boton = document.querySelector(".boton");
const sideBar = document.querySelector("#ostia");
boton?.addEventListener("click", ()=>{
    sideBar?.classList.toggle("mostrarSide");
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function redirect()
    {
    window.location.href="http://localhost:4321/perfil";
    }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////

        document.addEventListener('DOMContentLoaded', function () {
            // Función para calcular el total de una columna específica
            function calcularTotal(columna) {
                let total = 0;
                // Obtener todos los elementos de la columna especificada
                let elementos = document.querySelectorAll(`.${columna}`);
                elementos.forEach(elemento => {
                    if (elemento instanceof HTMLInputElement) {
                        total += parseFloat(elemento.value) || 0;
                    }
                });
                return total;
            }

            // Función para actualizar el resultado de una columna específica
            function actualizarResultado(columna, idResultado) {
                let total = calcularTotal(columna);
                let resultadoElemento = document.getElementById(idResultado);
                if (resultadoElemento) {
                    resultadoElemento.textContent = total.toFixed(0);
                }
            }

            // Agregar eventos input a cada columna
            ['ingresos', 'compras', 'gastos', 'utilidad'].forEach(columna => {
                let inputs = document.querySelectorAll(`.${columna}`);
                inputs.forEach(input => {
                    input.addEventListener('input', () => {
                        actualizarResultado(columna, `total_${columna}`);
                    });
                });
            });

            ['ingresos', 'compras', 'gastos', 'utilidad'].forEach(columna => {
                let inputs = document.querySelectorAll(`.${columna}`);
                inputs.forEach(input => {
                    input.addEventListener('input', () => {
                        let ingresos = calcularTotal('ingresos');
                        let compras = calcularTotal('compras');
                        let gastos = calcularTotal('gastos');
                        let utilidad = calcularTotal('utilidad');
                        let sumatoria = (ingresos + utilidad) + (compras + gastos);
                       
                    });
                });
            });
        });
