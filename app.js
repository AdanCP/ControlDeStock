const API_URL = "/api/stock";

const lista = document.getElementById("lista");
const form = document.getElementById("form");

async function cargar() {
  const res = await fetch(API_URL);
  const data = await res.json();

  lista.innerHTML = "";
  data.forEach(item => {
    lista.innerHTML += `
      <li>
        ${item.nombre} (${item.cantidad})
        <button onclick="borrar(${item.id})">❌</button>
      </li>
    `;
  });
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  const nombre = nombreInput.value;
  const cantidad = cantidadInput.value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, cantidad })
  });

  form.reset();
  cargar();
});

async function borrar(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  cargar();
}

const nombreInput = document.getElementById("nombre");
const cantidadInput = document.getElementById("cantidad");

cargar();
