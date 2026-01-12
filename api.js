console.log("api.js cargado");

const API_URL = "https://controldestock-6waj.onrender.com";

/* ==============================
   PRODUCTOS (STOCK)
============================== */

/* CREAR PRODUCTO */
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

  return await response.json();
}

/* OBTENER PRODUCTOS */
async function obtenerProductos() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return await response.json();
}

/*BORRAR PRODUCTOS */
async function borrarProducto(id) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al borrar producto");
  }

  return response.json();
}
