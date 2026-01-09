// app.js
console.log("app.js cargado");

import { state } from "./state.js";
import {
  renderHome,
  renderLogin,
  renderRegister,
  renderMainMenu,
  renderStockMenu,
  renderStockCrear,
  renderStockModificar,
  renderStockBorrar,
  renderStockConsultar
} from "./views.js";

const app = document.getElementById("app");

/* =====================
   NAVEGACIÓN
===================== */
export function goTo(view) {
  state.view = view;
  state.stockView = null;
  render();
}

export function goToStock(subView) {
  state.view = "stock";
  state.stockView = subView;
  render();
}

export function fakeLogin() {
  state.user = { name: "Usuario demo" };
  goTo("menu");
}

/* =====================
   ROUTER
===================== */
function render() {
  app.innerHTML = "";

  if (state.view === "home") renderHome();
  else if (state.view === "login") renderLogin();
  else if (state.view === "register") renderRegister();
  else if (state.view === "menu") renderMainMenu();

  else if (state.view === "stock") {
    if (!state.stockView) renderStockMenu();
    else if (state.stockView === "crear") renderStockCrear();
    else if (state.stockView === "modificar") renderStockModificar();
    else if (state.stockView === "borrar") renderStockBorrar();
    else if (state.stockView === "consultar") renderStockConsultar();
  }

  else {
    app.innerHTML = "<p>Pantalla no encontrada</p>";
  }
}

/* =====================
   BOOTSTRAP
===================== */
document.addEventListener("DOMContentLoaded", () => {
  render();
});
