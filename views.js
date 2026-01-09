// views.js
console.log("views.js cargado");

import { goTo, goToStock, fakeLogin } from "./app.js";

const app = document.getElementById("app");

/* =====================
   HOME
===================== */
export function renderHome() {
  app.innerHTML = `
    <div class="card center-screen">
      
      <h1>Control de Stock</h1>
      <p class="muted">Gestión simple y rápida</p>

      <img src="assets/logo-mercuria.jpeg" alt="Logo" class="logo" />

      <button id="btn-login" class="btn-primary">
        Iniciar sesión
      </button>

      <button id="btn-register" class="btn-secondary">
        Registrarse
      </button>
    </div>
  `;

  document
    .getElementById("btn-login")
    .addEventListener("click", () => goTo("login"));

  document
    .getElementById("btn-register")
    .addEventListener("click", () => goTo("register"));
}

/* =====================
   LOGIN
===================== */
export function renderLogin() {
  app.innerHTML = `
    <div class="card">
      <h2>Iniciar sesión</h2>

      <input placeholder="Usuario" />
      <input type="password" placeholder="Contraseña" />

      <button id="btn-login-ok" class="btn-primary">Entrar</button>
      <button id="btn-login-back">Volver</button>
    </div>
  `;

  document
    .getElementById("btn-login-ok")
    .addEventListener("click", fakeLogin);

  document
    .getElementById("btn-login-back")
    .addEventListener("click", () => goTo("home"));
}

/* =====================
   REGISTER
===================== */
export function renderRegister() {
  app.innerHTML = `
    <div class="card">
      <h2>Registro</h2>

      <input placeholder="Usuario" />
      <input type="password" placeholder="Contraseña" />

      <button class="btn-primary">Registrar</button>
      <button id="btn-register-back">Volver</button>
    </div>
  `;

  document
    .getElementById("btn-register-back")
    .addEventListener("click", () => goTo("home"));
}

/* =====================
   MENÚ PRINCIPAL
===================== */
export function renderMainMenu() {
  app.innerHTML = `
    <div class="card">
      <h2>Menú principal</h2>

      <div class="icon-grid">
        <button id="btn-stock" class="icon-button primary">
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

      <button id="btn-logout">Cerrar sesión</button>
    </div>
  `;

  document
    .getElementById("btn-stock")
    .addEventListener("click", () => goTo("stock"));

  document
    .getElementById("btn-logout")
    .addEventListener("click", () => goTo("home"));
}

/* =====================
   STOCK - MENÚ
===================== */
export function renderStockMenu() {
  app.innerHTML = `
    <div class="card">
      <h2>Stock</h2>

      <div class="icon-grid">
        <button id="stock-consultar" class="icon-button primary">
          <span>🔍</span>
          Consultar
        </button>

        <button id="stock-crear" class="icon-button primary">
          <span>➕</span>
          Crear
        </button>

        <button id="stock-modificar" class="icon-button primary">
          <span>✏️</span>
          Modificar
        </button>

        <button id="stock-borrar" class="icon-button danger">
          <span>🗑️</span>
          Borrar
        </button>
      </div>

      <button id="btn-stock-back">Volver</button>
    </div>
  `;

  document
    .getElementById("stock-consultar")
    .addEventListener("click", () => goToStock("consultar"));

  document
    .getElementById("stock-crear")
    .addEventListener("click", () => goToStock("crear"));

  document
    .getElementById("stock-modificar")
    .addEventListener("click", () => goToStock("modificar"));

  document
    .getElementById("stock-borrar")
    .addEventListener("click", () => goToStock("borrar"));

  document
    .getElementById("btn-stock-back")
    .addEventListener("click", () => goTo("menu"));
}

/* =====================
   STOCK - CREAR
===================== */
export function renderStockCrear() {
  app.innerHTML = `
    <div class="card">
      <h2>Crear producto</h2>

      <input placeholder="Producto" />
      <input placeholder="Marca" />
      <input placeholder="Detalle" />
      <input placeholder="Contenido / Peso" />

      <button class="btn-primary">Aceptar</button>
      <button id="btn-back-stock">Volver</button>
    </div>
  `;

  document
    .getElementById("btn-back-stock")
    .addEventListener("click", () => goTo("stock"));
}

/* =====================
   STOCK - MODIFICAR
===================== */
export function renderStockModificar() {
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
      <button id="btn-back-stock">Volver</button>
    </div>
  `;

  document
    .getElementById("btn-back-stock")
    .addEventListener("click", () => goTo("stock"));
}

/* =====================
   STOCK - BORRAR
===================== */
export function renderStockBorrar() {
  app.innerHTML = `
    <div class="card">
      <h2>Borrar producto</h2>

      <select>
        <option>Seleccionar producto</option>
      </select>

      <button class="btn-danger">Borrar</button>
      <button id="btn-back-stock">Volver</button>
    </div>
  `;

  document
    .getElementById("btn-back-stock")
    .addEventListener("click", () => goTo("stock"));
}

/* =====================
   STOCK - CONSULTAR
===================== */
export function renderStockConsultar() {
  app.innerHTML = `
    <div class="card">
      <h2>Consultar stock</h2>

      <button class="icon-button">
        <span>📋</span>
        Stock total
      </button>

      <button class="icon-button">
        <span>📦</span>
        Por producto
      </button>

      <button id="btn-back-stock">Volver</button>
    </div>
  `;

  document
    .getElementById("btn-back-stock")
    .addEventListener("click", () => goTo("stock"));
}
