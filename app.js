console.log("app.js cargado");

const app = document.getElementById("app");

function goTo(view) {
  state.view = view;
  state.stockView = null;
  render();
}

function goToStock(subView) {
  state.stockView = subView;
  render();
}

function goToStockMenu() {
  state.stockView = null;
  render();
}

function fakeLogin() {
  state.user = { name: "Usuario demo" };
  goTo("menu");
}

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

render();
