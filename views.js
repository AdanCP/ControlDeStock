console.log("views.js cargado");

/* ===== HOME ===== */
function renderHome() {
  app.innerHTML = `
    <div class="card center-screen">
      <h1>Control de Stock</h1>
      <p class="muted">Gestión simple y rápida</p>

      <img src="assets/logo-mercuria.jpeg" alt="Logo" class="logo" />

      <button class="btn-primary" onclick="goTo('login')">
        Iniciar sesión
      </button>

      <button class="btn-secondary" onclick="goTo('register')">
        Registrarse
      </button>
    </div>
  `;
}

/* ===== LOGIN ===== */
function renderLogin() {
  app.innerHTML = `
    <div class="card center-screen">
      <h2>Iniciar sesión</h2>

      <input placeholder="Usuario" />
      <input type="password" placeholder="Contraseña" />

      <button class="btn-primary" onclick="fakeLogin()">Entrar</button>
      <button onclick="goTo('home')">Volver</button>
    </div>
  `;
}

/* ===== REGISTER ===== */
function renderRegister() {
  app.innerHTML = `
    <div class="card center-screen">
      <h2>Registro</h2>

      <input placeholder="Usuario" />
      <input type="password" placeholder="Contraseña" />

      <button class="btn-primary">Registrar</button>
      <button onclick="goTo('home')">Volver</button>
    </div>
  `;
}

/* ===== MENÚ PRINCIPAL ===== */
function renderMainMenu() {
  app.innerHTML = `
    <div class="card menu">
      <h2>Menú principal</h2>

      <div class="icon-grid">
        <button class="icon-button" onclick="goTo('stock')">
          <span>📦</span>
          Stock
        </button>

        <button class="icon-button">
          <span>💰</span>
          Ventas
        </button>

        <button class="icon-button" onclick="goTo('pedidos')">
          <span>🚚</span>
          Pedidos
        </button>

        <button class="icon-button">
          <span>📄</span>
          Listados
        </button>
      </div>

      <button onclick="goTo('home')">Cerrar sesión</button>
    </div>
  `;
}

/* ===== STOCK MENÚ ===== */
function renderStockMenu() {
  app.innerHTML = `
    <div class="card menu">
      <h2>Stock</h2>

      <div class="icon-grid">
        <button class="icon-button" onclick="goToStock('consultar')">
          <span>🔍</span>
          Consultar
        </button>

        <button class="icon-button" onclick="goToStock('crear')">
          <span>➕</span>
          Crear
        </button>

        <button class="icon-button" onclick="goToStock('modificar')">
          <span>✏️</span>
          Modificar
        </button>

        <button class="icon-button danger" onclick="goToStock('borrar')">
          <span>🗑️</span>
          Borrar
        </button>
      </div>

      <button onclick="goTo('menu')">Volver</button>
    </div>
  `;
}

/* ===== PEDIDOS - LISTADO ===== */
function renderPedidos() {
  app.innerHTML = `
    <div class="card menu">
      <h2>Pedidos pendientes</h2>

      <div class="list">
        <p class="muted">No hay pedidos pendientes</p>
      </div>

      <button class="btn-primary" onclick="renderNuevoPedido()">
        ➕ Nuevo pedido
      </button>

      <button onclick="goTo('menu')">Volver</button>
    </div>
  `;
}

/* ===== PEDIDOS - NUEVO (FIX REAL) ===== */
async function renderNuevoPedido() {
  app.innerHTML = `
    <div class="card center-screen">
      <div class="loader"></div>
      <p class="loader-text">Cargando productos...</p>
      <button onclick="renderPedidos()">Volver</button>
    </div>
  `;

  const productos = await obtenerProductos();

  let options = `<option value="">Seleccionar producto</option>`;
  productos.forEach((p) => {
    options += `
      <option value="${p.id}">
        ${p.producto} | ${p.marca} | ${p.contenido_peso}
        ${p.detalle ? " - " + p.detalle : ""}
      </option>
    `;
  });

  app.innerHTML = `
    <div class="card center-screen">
      <h2>Nuevo pedido</h2>

      <select id="pedidoProducto">
        ${options}
      </select>

      <input type="number" id="pedidoCantidad" placeholder="Cantidad de unidades" />
      <input type="number" id="pedidoPrecio" placeholder="Precio unitario" />
      <input type="date" id="pedidoFecha" />

      <div style="text-align:left; margin: 10px 0">
        <label>
          <input type="checkbox" id="pedidoPendiente" checked onclick="toggleEstadoPedido('pendiente')" />
          Pendiente
        </label><br />

        <label>
          <input type="checkbox" id="pedidoLlegado" onclick="toggleEstadoPedido('llegado')" />
          Llegado
        </label>
      </div>

      <button class="btn-primary" onclick="confirmarPedido()">Aceptar</button>
      <button onclick="cancelarPedido()">Cancelar</button>
    </div>
  `;
}

/* ===== VALIDACIONES PEDIDO ===== */
function toggleEstadoPedido(estado) {
  const pendiente = document.getElementById("pedidoPendiente");
  const llegado = document.getElementById("pedidoLlegado");

  if (estado === "pendiente") llegado.checked = false;
  if (estado === "llegado") pendiente.checked = false;
}
