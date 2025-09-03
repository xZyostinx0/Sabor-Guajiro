// ====== MOSTRAR PEDIDOS EN ADMIN ======
const pedidosTable = document.querySelector("#pedidosTable tbody");

if (pedidosTable) {
  let pedidos = JSON.parse(localStorage.getItem("carrito")) || [];

  if (pedidos.length === 0) {
    pedidosTable.innerHTML = "<tr><td colspan='4'>No hay pedidos</td></tr>";
  } else {
    pedidos.forEach((p, index) => {
      let fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.mesa}</td>
        <td>${p.nombre}</td>
        <td>$${p.precio.toLocaleString("es-CO")}</td>
        <td><button class="eliminarBtn" data-index="${index}"> Terminado</button></td>
      `;
      pedidosTable.appendChild(fila);
    });
  }

  // === Evento eliminar pedido en tiempo real ===
  const eliminarBtns = document.querySelectorAll(".eliminarBtn");
  eliminarBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let index = btn.getAttribute("data-index");

      // Eliminar del array
      pedidos.splice(index, 1);

      // Guardar nueva lista en localStorage
      localStorage.setItem("carrito", JSON.stringify(pedidos));

      // Animación antes de eliminar fila
      const fila = btn.closest("tr");
      fila.classList.add("eliminando");

      setTimeout(() => {
        fila.remove();

        // Si ya no hay pedidos, mostrar mensaje
        if (pedidos.length === 0) {
          pedidosTable.innerHTML = "<tr><td colspan='4'>No hay pedidos</td></tr>";
        }
      }, 400); // tiempo igual a la animación en CSS
    });
  });
}

// ====== GESTIÓN DE MENÚ ======
const menuTable = document.querySelector("#menuTable tbody");
const addDishBtn = document.querySelector("#addDishBtn");

// Obtener menú guardado o valores iniciales
let menu = JSON.parse(localStorage.getItem("menu")) || [
  { nombre: "Pizza Margarita", precio: 20000, estado: "Disponible" },
  { nombre: "Pasta Alfredo", precio: 25000, estado: "Disponible" },
  { nombre: "Ensalada César", precio: 15000, estado: "Agotado" }
];

// Guardar en localStorage
function saveMenu() {
  localStorage.setItem("menu", JSON.stringify(menu));
}

// Renderizar tabla de menú
function renderMenu() {
  menuTable.innerHTML = "";
  if (menu.length === 0) {
    menuTable.innerHTML = "<tr><td colspan='4'>No hay platos en el menú</td></tr>";
    return;
  }

  menu.forEach((plato, index) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
      <td contenteditable="true" class="editable" data-field="nombre">${plato.nombre}</td>
      <td contenteditable="true" class="editable" data-field="precio">${plato.precio}</td>
      <td>
        <select class="estadoSelect" data-index="${index}">
          <option value="Disponible" ${plato.estado === "Disponible" ? "selected" : ""}>Disponible</option>
          <option value="Agotado" ${plato.estado === "Agotado" ? "selected" : ""}>Agotado</option>
        </select>
      </td>
      <td>
        <button class="deleteBtn" data-index="${index}"> Eliminar</button>
      </td>
    `;
    menuTable.appendChild(fila);
  });

  // === Eventos ===
  document.querySelectorAll(".editable").forEach(cell => {
    cell.addEventListener("blur", (e) => {
      const field = e.target.getAttribute("data-field");
      const index = e.target.parentElement.querySelector(".estadoSelect").getAttribute("data-index");
      menu[index][field] = (field === "precio") ? parseInt(e.target.innerText) || 0 : e.target.innerText;
      saveMenu();
    });
  });

  document.querySelectorAll(".estadoSelect").forEach(select => {
    select.addEventListener("change", (e) => {
      const index = e.target.getAttribute("data-index");
      menu[index].estado = e.target.value;
      saveMenu();
    });
  });

  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      menu.splice(index, 1);
      saveMenu();
      renderMenu();
    });
  });
}

// Agregar nuevo plato
addDishBtn.addEventListener("click", () => {
  menu.push({ nombre: "Nuevo Plato", precio: 0, estado: "Disponible" });
  saveMenu();
  renderMenu();
});

// Render inicial
renderMenu();

// ====== DATOS GLOBALES ======
let totalPedidos = 0;
let totalIngresos = 0;
let totalEgresos = localStorage.getItem("egresos") 
  ? parseFloat(localStorage.getItem("egresos")) 
  : 0;

document.getElementById("totalEgresos").textContent = `$${totalEgresos}`;

// ====== ACTUALIZAR PEDIDOS ======
function agregarPedido(precio) {
  totalPedidos++;
  document.getElementById("totalPedidos").textContent = totalPedidos;

  // Guardamos precio del pedido en lista de pendientes
  let pendientes = JSON.parse(localStorage.getItem("pendientes")) || [];
  pendientes.push(precio);
  localStorage.setItem("pendientes", JSON.stringify(pendientes));
}

// ====== ELIMINAR PEDIDO (ya pagado) ======
function eliminarPedido(index) {
  let pendientes = JSON.parse(localStorage.getItem("pendientes")) || [];
  if (pendientes[index]) {
    totalIngresos += pendientes[index];
    document.getElementById("totalIngresos").textContent = `$${totalIngresos}`;

    // Quitamos el pedido entregado
    pendientes.splice(index, 1);
    localStorage.setItem("pendientes", JSON.stringify(pendientes));
  }
}

// ====== AL CARGAR PANEL ======
window.addEventListener("load", () => {
  // Cargar pedidos pendientes
  let pendientes = JSON.parse(localStorage.getItem("pendientes")) || [];
  totalPedidos = pendientes.length;
  document.getElementById("totalPedidos").textContent = totalPedidos;

  // Cargar ingresos acumulados
  document.getElementById("totalIngresos").textContent = `$${totalIngresos}`;
});


