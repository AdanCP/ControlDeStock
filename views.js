function renderLogin() {}
function renderRegister() {}
function renderMainMenu() {}
function renderStockMenu() {}
function renderPedidos() {}
function renderVentas() {}
function renderListados() {}

function renderLogin() {
  app.innerHTML = `
    <div class="card">
      <h2>Control de Stock</h2>

      <input placeholder="Usuario" />
      <input type="password" placeholder="Contraseña" />

      <button>Iniciar sesión</button>
      <button class="secondary">Registrarse</button>
    </div>
  `;
}

function renderMainMenu() {
  app.innerHTML = `
    <div class="card">
      <h3>Menú principal</h3>

      <button>📦 STOCK</button>
      <button>🚚 PEDIDOS</button>
      <button>💰 VENTAS</button>
      <button>📊 LISTADOS</button>
    </div>
  `;
}
