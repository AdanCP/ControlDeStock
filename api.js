const API_URL = "http://localhost:3000";

/* ==============================
   PRODUCTOS (STOCK)
============================== */

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

async function obtenerProductos() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return response.json();
}
