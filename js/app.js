let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let productos = [];

async function cargarProductos() {
    try {
        const respuesta = await fetch('../productos.json');
        if (!respuesta.ok) {
            throw new Error('No se pudo cargar el archivo de productos');
        }
        productos = await respuesta.json();
        renderizarProductos();
    } catch (error) {
        console.error('Error cargando los productos:', error);
    }
}

function renderizarProductos() {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>$${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarritoEnLocalStorage();
    alert(`${producto.nombre} ha sido agregado al carrito`);
}

function actualizarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(); 
}

function mostrarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    const total = document.getElementById('total');
    carritoLista.innerHTML = ''; 
    let totalPrecio = 0;
    carrito.forEach(producto => {
        const productoCarrito = document.createElement('li');
        productoCarrito.textContent = `${producto.nombre} - $${producto.precio}`;
        carritoLista.appendChild(productoCarrito);
        totalPrecio += producto.precio;
    });
    total.textContent = `Total: $${totalPrecio}`;
}

document.getElementById('verCarrito').addEventListener('click', () => {
    document.getElementById('carrito').style.display = 'block';
    mostrarCarrito();
    document.getElementById('productos').style.display = 'none';
});

document.getElementById('volverTiendas').addEventListener('click', () => {
    document.getElementById('carrito').style.display = 'none';
    document.getElementById('productos').style.display = 'flex';
});

document.getElementById('finalizarCompra').addEventListener('click', () => {
    alert('¡Gracias por tu compra! ¡Vuelve pronto!');
    carrito = []; 
    actualizarCarritoEnLocalStorage(); 
    document.getElementById('carrito').style.display = 'none';
    document.getElementById('productos').style.display = 'flex';
});

cargarProductos();
