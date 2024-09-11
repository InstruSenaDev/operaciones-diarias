
  // Obtenemos la fecha actual
  const currentDate = new Date();

  // Formateamos la fecha en el formato que necesites
  const formattedDate = currentDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Insertamos la fecha en el HTML
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fecha-actual").innerText = formattedDate;
  });

