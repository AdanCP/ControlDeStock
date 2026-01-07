console.log("views.js cargado");

/* ===== HOME ===== */
function renderHome() {
  app.innerHTML = `
    <div class="card">
      <h1>Control de Stock</h1>
      <p class="muted">Gestión simple y rápida</p>

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
    <div class="card">
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
    <div class="card">
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
    <div class="card">
      <h2>Menú principal</h2>

      <div class="icon-grid">
        <button class="icon-button primary" onclick="goTo('stock')">
          <span>📦</span>
          Stock
        </button>

        <button class="icon-button primary">
          <span>💰</span>
          Ventas
        </button>

        <button class="icon-button primary">
          <span>🚚</span>
          Pedidos
        </button>

        <button class="icon-button primary">
          <span>📄</span>
          Listados
        </button>
      </div>

      <button onclick="goTo('home')">Cerrar sesión</button>
    </div>
  `;
}

/* ===== STOCK - MENÚ ===== */
function renderStockMenu() {
  app.innerHTML = `
    <div class="card">
      <h2>Stock</h2>

      <div class="icon-grid">
        <button class="icon-button primary" onclick="goToStock('consultar')">
          <span>🔍</span>
          Consultar
        </button>

        <button class="icon-button primary" onclick="goToStock('crear')">
          <span>➕</span>
          Crear
        </button>

        <button class="icon-button primary" onclick="goToStock('modificar')">
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

/* ===== STOCK - CREAR ===== */
function renderStockCrear() {
  app.innerHTML = `
    <div class="card">
      <h2>Crear producto</h2>

      <input placeholder="Producto" />
      <input placeholder="Marca" />
      <input placeholder="Detalle" />
      <input placeholder="Contenido / Peso" />

      <button class="btn-primary">Aceptar</button>
      <button onclick="goToStockMenu()">Volver (pierde cambios)</button>
    </div>
  `;
}

/* ===== STOCK - MODIFICAR ===== */
function renderStockModificar() {
  app.innerHTML = `
    <div class="card">
      <h2>Modificar producto</h2>

      <select>
        <option>Seleccionar producto</option>
      </select>

      <input placeholder="Producto" />
      <input placeholder="Marca" />
      <input placeholder="Detalle" />
      <input placeholder="Contenido / Peso" />

      <button class="btn-primary">Modificar</button>
      <button onclick="goToStockMenu()">Volver (pierde cambios)</button>
    </div>
  `;
}

/* ===== STOCK - BORRAR ===== */
function renderStockBorrar() {
  app.innerHTML = `
    <div class="card">
      <h2>Borrar producto</h2>

      <select>
        <option>Seleccionar producto</option>
      </select>

      <button class="btn-danger">Borrar</button>
      <button onclick="goToStockMenu()">Volver</button>
    </div>
  `;
}

/* ===== STOCK - CONSULTAR ===== */
function renderStockConsultar() {
  app.innerHTML = `
    <div class="card">
      <h2>Consultar stock</h2>

      <div class="icon-grid">
        <button class="icon-button primary">
          <span>📦</span>
          Stock total
        </button>

        <button class="icon-button primary">
          <span>🔎</span>
          Por producto
        </button>
      </div>

      <button onclick="goToStockMenu()">Volver</button>
    </div>
  `;
}
