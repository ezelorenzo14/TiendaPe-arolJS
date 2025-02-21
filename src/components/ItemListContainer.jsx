import React, { useEffect, useState } from "react";
import Catalogo from "./Catalogo";  // Componente que muestra la lista de productos

const ItemListContainer = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);

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

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <Catalogo productos={productos} agregarAlCarrito={agregarAlCarrito} />
    </div>
  );
};

export default ItemListContainer;
