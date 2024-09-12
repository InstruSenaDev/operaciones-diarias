
import React, { useState, useRef, useEffect } from 'react';
import '../../css/como.css';

const App = () => {
  const [data, setData] = useState({
    ingresos: Array(12).fill(''),
    compras: Array(12).fill(''),
    gastos: Array(12).fill(''),
    utilidad: Array(12).fill('')
  });

  const months = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO',
    'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];

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

  const calculateSumatoria = () => {
    const ingresos = calculateTotal('ingresos');
    const compras = calculateTotal('compras');
    const gastos = calculateTotal('gastos');
    const utilidad = calculateTotal('utilidad');
    return (ingresos + utilidad) - (compras + gastos);
  };

  const getCellClass = (value) => {
    return value.trim().startsWith('0') ? 'celda-cero' : '';
  };

  const handleKeyPress = (event) => {
    if (event.charCode < 48 || event.charCode > 57) {
      event.preventDefault(); 
    }
  };

  const [mostrarSidebar, setMostrarSidebar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const iframeRef = useRef(null);

  const handleBotonClick = () => {
    setMostrarSidebar(prevState => !prevState);
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
              /* ... (resto de los estilos) ... */
            </style>
          </head>
          <body>
            <div class="cubo">
              <!-- ... (contenido del iframe) ... -->
            </div>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [isVisible]);

  const toggleIframeVisibility1 = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="cubo">
      <div className="cubo1">
        <button className="boton" onClick={handleBotonClick}>
          <img src="../img/boton.png" className="butun" alt="boton" />
        </button>
        <p>Recomendaciones</p>
        <button className="persona" onClick={toggleIframeVisibility1}>
          <img src="../img/persona.png" className="per" id="toggleButton" alt="persona" />
          {isVisible ? '' : ''}
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
            <input className="int" placeholder="año" type="text" id="select" />
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
                  <td className={`cuerpo ${getCellClass(data.utilidad[index])}`}>
                    <input
                      type="number"
                      className="monto utilidad"
                      value={data.utilidad[index]}
                      onChange={(e) => handleChange(e, 'utilidad', index)}
                      onKeyPress={handleKeyPress}
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <div className="dos">TOTAL</div>
            <div className="uno" id="total_ingresos">{calculateTotal('ingresos').toFixed(0)}</div>
            <div className="uno" id="total_compras">{calculateTotal('compras').toFixed(0)}</div>
            <div className="uno" id="total_gastos">{calculateTotal('gastos').toFixed(0)}</div>
            <div className="tres" id="total_utilidad">{calculateTotal('utilidad').toFixed(0)}</div>
          </div>
          <div className="S" id="total_sumatoria">{calculateSumatoria().toFixed(0)}</div>
        </div>
        <div className='d4'>
<iframe ref={iframeRef} width="310" height="500" style={{ border: 'none', display: isVisible ? 'none' : 'block' }}></iframe>
</div>
      </div>
    </div>
  );;
};

export default App;