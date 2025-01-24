import React from "react";

const Carrito = ({ carrito, finalizarCompra }) => {
  return (
    <section id="carrito">
      <h2>Tu Carrito</h2>
      <ul id="carrito-lista">
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          carrito.map((producto, index) => (
            <li key={index}>
              {producto.nombre} - ${producto.precio}
            </li>
          ))
        )}
      </ul>
      <p id="total">
        Total: $
        {carrito.reduce((total, producto) => total + producto.precio, 0)}
      </p>
      {carrito.length > 0 && (
        <button onClick={finalizarCompra}>Finalizar Compra</button>
      )}
    </section>
  );
};

export default Carrito;
