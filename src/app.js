import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Catalogo from "./components/Catalogo";
import DetalleProducto from "./components/DetalleProducto";

const App = () => {
  // Estado para carrito y productos
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );
  const [productos, setProductos] = useState([]);

  // Cargar productos desde un archivo JSON
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch("/productos.json");
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el archivo de productos");
        }
        const productosData = await respuesta.json();
        setProductos(productosData);
      } catch (error) {
        console.error("Error cargando los productos:", error);
      }
    };
    cargarProductos();
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar productos al carrito
  const agregarAlCarrito = (id) => {
    const producto = productos.find((p) => p.id === id);
    if (producto) {
      setCarrito([...carrito, producto]);
      alert(`${producto.nombre} ha sido agregado al carrito`);
    }
  };

  // Vaciar el carrito después de la compra
  const finalizarCompra = () => {
    alert("¡Gracias por tu compra! ¡Vuelve pronto!");
    setCarrito([]);
  };

  return (
    <Router>
      {/* Navbar siempre visible */}
      <Navbar carrito={carrito} />

      <Routes>
        {/* Página de catálogo */}
        <Route
          path="/"
          element={
            <Catalogo
              productos={productos}
              agregarAlCarrito={agregarAlCarrito}
            />
          }
        />

        {/* Detalle de producto */}
        <Route
          path="/producto/:id"
          element={<DetalleProducto productos={productos} />}
        />
      </Routes>

      {/* Carrito como sección fija */}
      <div className="carrito-fijo">
        <h2>Tu Carrito</h2>
        <ul>
          {carrito.map((producto, index) => (
            <li key={index}>
              {producto.nombre} - ${producto.precio}
            </li>
          ))}
        </ul>
        <p>
          Total: $
          {carrito.reduce((total, producto) => total + producto.precio, 0)}
        </p>
        <button onClick={finalizarCompra}>Finalizar Compra</button>
      </div>
    </Router>
  );
};

export default App;
