import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ carrito }) => {
  return (
    <header>
      <h1>Bienvenido a la Tienda Oficial de Peñarol</h1>
      <nav>
        <Link to="/">Inicio</Link>
        <button>
          Ver Carrito ({carrito.length})
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
