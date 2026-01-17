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
    Swal.fire({
      icon: "warning",
      title: "Datos incompletos",
      text: "Completá al menos Producto, Marca y Contenido",
    });
    return;
  }

  const confirmacion = await Swal.fire({
    title: "¿Crear producto?",
    html: `
      <strong>${producto}</strong><br>
      ${marca} – ${contenido}
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, crear",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#c2a86e",
    cancelButtonColor: "#666",
  });

  if (!confirmacion.isConfirmed) return;

  try {
    await crearProducto({
      producto,
      marca,
      detalle,
      contenido_peso: contenido,
    });

    await Swal.fire({
      icon: "success",
      title: "Producto creado",
      text: "El producto se guardó correctamente",
      timer: 1500,
      showConfirmButton: false,
    });

    goToStockMenu();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo crear el producto",
    });
    console.error(error);
  }
}


/* ===== STOCK CONSULTAR ===== */
async function renderStockConsultar() {
  app.innerHTML = `
    <div class="card center-screen">
      <div class="loader"></div>
      <p class="loader-text">Cargando productos...</p>
      <button onclick="goToStockMenu()">Volver</button>
    </div>
  `;

  try {
    const productos = await obtenerProductos();

    let html = `
      <div class="card menu">
        <h2>Productos</h2>
        <div class="list">
    `;

    if (productos.length === 0) {
      html += `<p class="muted">No hay productos cargados</p>`;
    } else {
      productos.forEach((p) => {
        html += `
          <div class="item">
            <strong>${p.producto}</strong><br />
            <small>${p.marca} – ${p.contenido_peso}</small><br />
            <small class="muted">${p.detalle || ""}</small>
          </div>
        `;
      });
    }

    html += `
        </div>
        <button onclick="goToStockMenu()">Volver</button>
      </div>
    `;

    app.innerHTML = html;
  } catch (error) {
    app.innerHTML = `
      <div class="card center-screen">
        <p>Error al cargar productos</p>
        <button onclick="goToStockMenu()">Volver</button>
      </div>
    `;
    console.error(error);
  }
}

/* ===== STOCK BORRAR ===== */
async function renderStockBorrar() {
  app.innerHTML = `
    <div class="card center-screen">
      <div class="loader"></div>
      <p class="loader-text">Cargando productos...</p>
      <button onclick="goToStockMenu()">Volver</button>
    </div>
  `;

  try {
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
        <h2>Borrar producto</h2>

        <select id="productoSelect">
          ${options}
        </select>

        <button class="btn-primary" onclick="confirmarBorradoSeleccionado()">
          Eliminar
        </button>

        <button onclick="goToStockMenu()">Volver</button>
      </div>
    `;
  } catch (error) {
    app.innerHTML = `
      <div class="card center-screen">
        <p>Error al cargar productos</p>
        <button onclick="goToStockMenu()">Volver</button>
      </div>
    `;
    console.error(error);
  }
}

/* ===== CONFIRMAR BORRADO DESDE SELECT ===== */
function confirmarBorradoSeleccionado() {
  const select = document.getElementById("productoSelect");
  const id = select.value;
  const texto = select.options[select.selectedIndex]?.text;

  if (!id) {
    Swal.fire("Atención", "Seleccioná un producto", "warning");
    return;
  }

  Swal.fire({
    title: "¿Eliminar producto?",
    text: texto,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#c2a86e",
    cancelButtonColor: "#555",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await borrarProducto(id);

        Swal.fire({
          icon: "success",
          title: "Producto eliminado",
          timer: 1200,
          showConfirmButton: false,
        });

        goToStockMenu();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el producto", "error");
        console.error(error);
      }
    }
  });
}

/* ===== STOCK MODIFICAR ===== */
async function renderStockModificar() {
  app.innerHTML = `
    <div class="card center-screen">
      <div class="loader"></div>
      <p class="loader-text">Cargando productos...</p>
      <button onclick="goToStockMenu()">Cancelar</button>
    </div>
  `;

  try {
    const productos = await obtenerProductos();

    let options = `<option value="">Seleccionar producto</option>`;
    productos.forEach((p) => {
      options += `
        <option value="${p.id}">
          ${p.producto} | ${p.marca} | ${p.contenido_peso}
        </option>
      `;
    });

    app.innerHTML = `
      <div class="card center-screen">
        <h2>Modificar producto</h2>

        <select id="productoSelect" onchange="cargarProductoParaEditar()">
          ${options}
        </select>

        <input id="producto" placeholder="Producto" disabled />
        <input id="marca" placeholder="Marca" disabled />
        <input id="detalle" placeholder="Detalle" disabled />
        <input id="contenido" placeholder="Contenido / Peso" disabled />

        <button class="btn-primary" onclick="confirmarModificacion()">
          Aceptar
        </button>

        <button onclick="goToStockMenu()">Cancelar</button>
      </div>
    `;

    window._productosCache = productos;
  } catch (error) {
    console.error(error);
  }
}

/* ===== CARGAR PRODUCTO EN FORM ===== */
function cargarProductoParaEditar() {
  const select = document.getElementById("productoSelect");
  const id = select.value;

  if (!id) return;

  const producto = window._productosCache.find(
    (p) => p.id === Number(id)
  );

  document.getElementById("producto").value = producto.producto;
  document.getElementById("marca").value = producto.marca;
  document.getElementById("detalle").value = producto.detalle || "";
  document.getElementById("contenido").value = producto.contenido_peso;

  document
    .querySelectorAll("#producto, #marca, #detalle, #contenido")
    .forEach((i) => (i.disabled = false));
}

/* ===== CONFIRMAR MODIFICACIÓN ===== */
async function confirmarModificacion() {
  const id = document.getElementById("productoSelect").value;

  if (!id) {
    Swal.fire("Atención", "Seleccioná un producto", "warning");
    return;
  }

  const data = {
    producto: document.getElementById("producto").value.trim(),
    marca: document.getElementById("marca").value.trim(),
    detalle: document.getElementById("detalle").value.trim(),
    contenido_peso: document.getElementById("contenido").value.trim(),
  };

  const confirmacion = await Swal.fire({
    title: "¿Guardar cambios?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, guardar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#c2a86e",
  });

  if (!confirmacion.isConfirmed) return;

  try {
    await modificarProducto(id, data);

    await Swal.fire({
      icon: "success",
      title: "Producto actualizado",
      timer: 1200,
      showConfirmButton: false,
    });

    goToStockMenu();
  } catch (error) {
    Swal.fire("Error", "No se pudo modificar el producto", "error");
    console.error(error);
  }
}

/* ===== PEDIDOS - LISTADO PENDIENTES ===== */
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

/* ===== PEDIDOS - NUEVO ===== */
function renderNuevoPedido() {
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
          <input type="checkbox" id="pedidoPendiente" checked />
          Pendiente
        </label><br />

        <label>
          <input type="checkbox" id="pedidoLlegado" />
          Llegado
        </label>
      </div>

      <button class="btn-primary" onclick="confirmarPedido()">
        Aceptar
      </button>

      <button onclick="cancelarPedido()">Cancelar</button>
    </div>
  `;
}

/* =========================
   PEDIDOS (FRONT)
========================= */

function renderPedidos() {
  app.innerHTML = `
    <div class="card menu">
      <h2>Pedidos pendientes</h2>
      <p class="muted">No hay pedidos pendientes</p>
      <button class="btn-primary" onclick="renderNuevoPedido()">➕ Nuevo pedido</button>
      <button onclick="goTo('menu')">Volver</button>
    </div>
  `;
}

async function renderNuevoPedido() {
  const productos = await obtenerProductos();

  let options = `<option value="">Seleccionar producto</option>`;
  productos.forEach(p => {
    options += `<option value="${p.id}">${p.producto} | ${p.marca}</option>`;
  });

  app.innerHTML = `
    <div class="card center-screen">
      <h2>Nuevo pedido</h2>
      <select>${options}</select>
      <input type="number" placeholder="Cantidad" />
      <input type="number" placeholder="Precio" />
      <input type="date" />
      <button class="btn-primary" onclick="renderPedidos()">Aceptar</button>
      <button onclick="renderPedidos()">Cancelar</button>
    </div>
  `;
}
