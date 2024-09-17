import { useState, useRef, useEffect } from 'react';
import '../../css/como.css'; 

const App = () => {
  const [data, setData] = useState({
    ingresos: Array(12).fill(''),
    compras: Array(12).fill(''),
    gastos: Array(12).fill(''),
  });

  const [selectedYear, setSelectedYear] = useState('2024');
  const [mostrarSidebar, setMostrarSidebar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const iframeRef = useRef(null);

  const years = Array.from({length: 26}, (_, i) => (2024 + i).toString());

  const months = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO',
    'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    // Aquí puedes añadir lógica adicional para cargar datos del año seleccionado si es necesario
  };

  const handleChange = (event, category, index) => {
    const { value } = event.target;
    setData(prevData => ({
      ...prevData,
      [category]: prevData[category].map((item, i) => (i === index ? value : item))
    }));
  };

  const calculateTotal = (category) => {
    return data[category].reduce((total, value) => total + parseFloat(value || 0), 0);
  };

  const calculateUtilidad = (index) => {
    const ingreso = parseFloat(data.ingresos[index] || 0);
    const compra = parseFloat(data.compras[index] || 0);
    const gasto = parseFloat(data.gastos[index] || 0);
    return ingreso - compra - gasto;
  };

  const calculateSumatoria = () => {
    const ingresos = calculateTotal('ingresos');
    const compras = calculateTotal('compras');
    const gastos = calculateTotal('gastos');
    return ingresos - compras - gastos;
  };

  const getCellClass = (value) => {
    return parseFloat(value) === 0 ? 'celda-cero' : '';
  };

  const handleKeyPress = (event) => {
    if (event.charCode < 48 || event.charCode > 57) {
      event.preventDefault(); 
    }
  };

  const handleBotonClick = () => {
    setMostrarSidebar(prevState => !prevState);
  };

  const toggleIframeVisibility1 = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Contenido del Iframe</title>
            <style>
              /* Estilos del iframe */
              .cubo {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                height: 402px;
                width: 200px;
              }
              .cubo1 {
                display: flex;
                align-items: center;
                flex-direction: column;
                height: 400px;
                width: 400px;
              }
              .persona {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                border: 1px solid #50B165;
                background-color: #50B165;
                height: 100px;
                width: 200px;
              }
              .cubo2 {
                border-left: 2px solid rgb(163, 163, 163);
                border-bottom: 2px solid rgb(163, 163, 163);
                border-right: 2px solid rgb(163, 163, 163);
                background-color: white;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 350px;
                width: 200px;
              }
              .d {
                background-color: white;
                display: flex;
                align-items: center;
                justify-content: space-around;
                height: 70px;
                width: 196px;
                border: none;
              }
              .foto { height: 50px; }
              .uty { height: 30px; }
              p {
                color: #000;
                font-size: 15px;
                font-weight: 490;
              }
            </style>
          </head>
          <body>
            <div class="cubo">
              <div class="cubo1">
                <div class="persona">
                  <img class="foto" src="../img/persona.png" alt="Persona" />
                  <p>Alexzandr_</p>
                </div>
                <div class="cubo2">
                  <button class="d">
                    <img class="uty" src="../img/lapiz.png" alt="Editar perfil" />
                    <p>Editar perfil</p>
                  </button>
                  <button class="d">
                    <img class="uty" src="../img/tuerca.png" alt="Ajustes" />
                    <p>Ajustes</p>
                  </button>
                  <button class="d">
                    <img class="uty" src="../img/puerta.png" alt="Cerrar Sesion" />
                    <p>Cerrar Sesion</p>
                  </button>
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [isVisible]);

  return (
    <div className="cubo">
      <div className="cubo1">
        <button className="boton" onClick={handleBotonClick}>
          <img src="../../../public/img/menu.png" className="butun" alt="boton" />
        </button>
        <button className="persona" onClick={toggleIframeVisibility1}>
          <img src="../img/persona.png" className="per" id="toggleButton" alt="persona" />
        </button>
      </div>
      <div className="cubo2">
        <div className={`d1 ${mostrarSidebar ? 'mostrarSide' : ''}`} id="ostia">
          <div className="libros"></div>
          <div className="libros"></div>
          <div className="libros"></div>
          <div className="libros"></div>
        </div>
        <div className="d3">
          <div className="como">¿Cómo va mi negocio?</div>
          <div className="año">
            <select value={selectedYear} onChange={handleYearChange}>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <table id="miTabla">
            <thead>
              <tr>
                <th className="cabeza">MES</th>
                <th className="cabeza">INGRESOS</th>
                <th className="cabeza">COMPRAS</th>
                <th className="cabeza">GASTOS</th>
                <th className="cabeza">UTILIDAD</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month, index) => (
                <tr key={index}>
                  <td className="cuerpo">{month}</td>
                  <td className={`cuerpo ${getCellClass(data.ingresos[index])}`}>
                    <input
                      type="number"
                      className="monto ingresos"
                      value={data.ingresos[index]}
                      onChange={(e) => handleChange(e, 'ingresos', index)}
                      onKeyPress={handleKeyPress}
                      min="0"
                    />
                  </td>
                  <td className={`cuerpo ${getCellClass(data.compras[index])}`}>
                    <input
                      type="number"
                      className="monto compras"
                      value={data.compras[index]}
                      onChange={(e) => handleChange(e, 'compras', index)}
                      onKeyPress={handleKeyPress}
                      min="0"
                    />
                  </td>
                  <td className={`cuerpo ${getCellClass(data.gastos[index])}`}>
                    <input
                      type="number"
                      className="monto gastos"
                      value={data.gastos[index]}
                      onChange={(e) => handleChange(e, 'gastos', index)}
                      onKeyPress={handleKeyPress}
                      min="0"
                    />
                  </td>
                  <td className={`cuerpo ${getCellClass(calculateUtilidad(index))}`}>
                    <span className="monto utilidad">
                      {calculateUtilidad(index).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <div className="dos">TOTAL</div>
            <div className="uno" id="total_ingresos">{calculateTotal('ingresos').toFixed(2)}</div>
            <div className="uno" id="total_compras">{calculateTotal('compras').toFixed(2)}</div>
            <div className="uno" id="total_gastos">{calculateTotal('gastos').toFixed(2)}</div>
            <div className="tres" id="total_utilidad">{calculateSumatoria().toFixed(2)}</div>
          </div>
          <div className="S" id="total_sumatoria">{calculateSumatoria().toFixed(2)}</div>
        </div>
        <div className='d4'>
          <iframe ref={iframeRef} width="310" height="500" style={{ border: 'none', display: isVisible ? 'none' : 'block' }}></iframe>
        </div>
      </div>
    </div>
  );
};

export default App;