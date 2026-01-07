const app = document.getElementById("app");

function render() {
  app.innerHTML = "";

  switch (state.view) {
    case "login":
      renderLogin();
      break;
    case "register":
      renderRegister();
      break;
    case "menu":
      renderMainMenu();
      break;
  }
}

render();
