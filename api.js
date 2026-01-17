console.log("api.js cargado");

/* ==============================
   CONFIG
============================== */

const API_URL = "https://controldestock-6waj.onrender.com";

/* ==============================
   PRODUCTOS (STOCK)
============================== */

// CREAR
async function crearProducto(producto) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!response.ok) {
    throw new Error("Error al crear el producto");
  }

  return response.json();
}

// OBTENER TODOS
async function obtenerProductos() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return response.json();
}

// MODIFICAR
async function modificarProducto(id, data) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al modificar producto");
  }

  return response.json();
}

// BORRAR
async function borrarProducto(id) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al borrar producto");
  }

  return response.json();
}

/* ==============================
   PEDIDOS (FRONT READY)
   (Backend viene después)
============================== */

// ⚠️ Por ahora NO persiste pedidos
// Sirve para mantener la arquitectura clara

async function obtenerPedidosPendientes() {
  // Placeholder – backend vendrá luego
  return [];
}

async function crearPedido(pedido) {
  // Placeholder – backend vendrá luego
  return { ok: true };
}

async function marcarPedidoLlegado(id) {
  // Placeholder – backend vendrá luego
  return { ok: true };
}
