console.log("views.js cargado");

/* HOME */
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

/* LOGIN */
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

/* REGISTER */
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

/* MENU PRINCIPAL */
function renderMainMenu() {
  app.innerHTML = `
    <div class="card">
      <h2>Menú principal</h2>

      <button class="btn-primary" onclick="goTo('stock')">📦 Stock</button>
      <button class="btn-primary">💰 Ventas</button>
      <button class="btn-primary">🚚 Pedidos</button>
      <button class="btn-primary">📄 Listados</button>

      <button onclick="goTo('home')">Cerrar sesión</button>
    </div>
  `;
}

/* ===== STOCK ===== */

function renderStockMenu() {
  app.innerHTML = `
    <div class="card">
      <h2>Stock</h2>

      <button class="btn-primary" onclick="goToStock('consultar')">🔍 Consultar</button>
      <button class="btn-primary" onclick="goToStock('crear')">➕ Crear</button>
      <button class="btn-primary" onclick="goToStock('modificar')">✏️ Modificar</button>
      <button class="btn-danger" onclick="goToStock('borrar')">🗑️ Borrar</button>

      <button onclick="goTo('menu')">Volver</button>
    </div>
  `;
}

/* STOCK - CREAR */
function renderStockCrear() {
  app.innerHTML = `
    <div class="card">
      <h2>Crear producto</h2>

      <input placeholder="Producto" />
      <input placeholder="Marca" />
      <input placeholder="Detalle" />
      <input placeholder="Contenido / Peso" />

      <button class="btn-primary">
        Aceptar
      </button>

      <button onclick="goToStockMenu()">
        Volver (pierde cambios)
      </button>
    </div>
  `;
}

/* STOCK - MODIFICAR */
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

      <button class="btn-primary">
        Modificar
      </button>

      <button onclick="goToStockMenu()">
        Volver (pierde cambios)
      </button>
    </div>
  `;
}

/* STOCK - BORRAR */
function renderStockBorrar() {
  app.innerHTML = `
    <div class="card">
      <h2>Borrar producto</h2>

      <select>
        <option>Seleccionar producto</option>
      </select>

      <button class="btn-danger">
        Borrar
      </button>

      <button onclick="goToStockMenu()">
        Volver
      </button>
    </div>
  `;
}

/* STOCK - CONSULTAR */
function renderStockConsultar() {
  app.innerHTML = `
    <div class="card">
      <h2>Consultar stock</h2>

      <button class="btn-primary">
        📦 Stock total
      </button>

      <button class="btn-primary">
        🔎 Stock por producto
      </button>

      <button onclick="goToStockMenu()">
        Volver
      </button>
    </div>
  `;
}
