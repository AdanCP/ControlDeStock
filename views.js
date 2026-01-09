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

        <button class="icon-button">
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

/* ===== STOCK CREAR ===== */
function renderStockCrear() {
  app.innerHTML = `
    <div class="card center-screen">
      <h2>Crear producto</h2>

      <input id="producto" placeholder="Producto" />
      <input id="marca" placeholder="Marca" />
      <input id="detalle" placeholder="Detalle" />
      <input id="contenido" placeholder="Contenido / Peso" />

      <button class="btn-primary" onclick="submitCrearProducto()">Aceptar</button>
      <button onclick="goToStockMenu()">Volver</button>
    </div>
  `;
}

/* ===== LOGICA CREAR PRODUCTO ===== */
async function submitCrearProducto() {
  const producto = document.getElementById("producto").value.trim();
  const marca = document.getElementById("marca").value.trim();
  const detalle = document.getElementById("detalle").value.trim();
  const contenido = document.getElementById("contenido").value.trim();

  if (!producto || !marca || !contenido) {
    alert("Completá al menos Producto, Marca y Contenido");
    return;
  }

  try {
    await crearProducto({
      producto,
      marca,
      detalle,
      contenido_peso: contenido, // 🔑 coincide con la DB
    });

    alert("Producto creado correctamente");
    goToStockMenu();
  } catch (error) {
    alert("Error al crear el producto");
    console.error(error);
  }
}
