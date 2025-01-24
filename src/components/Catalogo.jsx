import React from "react";
import { Link } from "react-router-dom";

const Catalogo = ({ productos, agregarAlCarrito }) => {
  return (
    <section id="productos" className="productos">
      {productos.map((producto) => (
        <div key={producto.id} className="producto">
          <img src={producto.imagen} alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          <p>${producto.precio}</p>
          <button onClick={() => agregarAlCarrito(producto.id)}>Agregar al Carrito</button>
          <Link to={`/producto/${producto.id}`}>Ver Detalle</Link>
        </div>
      ))}
    </section>
  );
};

export default Catalogo;
