// ========== MENÚ RESPONSIVE ==========
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("header nav ul");

    // Crear botón hamburguesa
    const btnMenu = document.createElement("div");
    btnMenu.innerHTML = "&#9776;"; // icono hamburguesa
    btnMenu.style.fontSize = "28px";
    btnMenu.style.cursor = "pointer";
    btnMenu.style.display = "none";
    document.querySelector("header").insertBefore(btnMenu, nav);

    // Mostrar/ocultar menú en móviles
    btnMenu.addEventListener("click", () => {
        nav.classList.toggle("activo");
    });

    // Estilos para responsive
    function ajustarMenu() {
        if (window.innerWidth <= 768) {
            btnMenu.style.display = "block";
            nav.style.display = "none";
        } else {
            btnMenu.style.display = "none";
            nav.style.display = "flex";
        }
    }

    ajustarMenu();
    window.addEventListener("resize", ajustarMenu);

    // Mostrar menú cuando tiene la clase activo
    const observer = new MutationObserver(() => {
        if (nav.classList.contains("activo")) {
            nav.style.display = "flex";
            nav.style.flexDirection = "column";
            nav.style.background = "#6b2d1a";
            nav.style.position = "absolute";
            nav.style.top = "70px";
            nav.style.right = "20px";
            nav.style.padding = "15px";
            nav.style.borderRadius = "8px";
        } else if (window.innerWidth <= 768) {
            nav.style.display = "none";
        }
    });

    observer.observe(nav, { attributes: true });
});

// ========== SCROLL SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener("click", function(e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute("href"));
        destino.scrollIntoView({ behavior: "smooth" });
    });
});

// ========== VALIDACIÓN DEL FORMULARIO ==========
const form = document.querySelector("#contacto form");

// ========== MENÚ RESPONSIVE ==========
document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.querySelector(".menu-toggle");
    const nav = document.querySelector("header nav");

    btnMenu.addEventListener("click", () => {
        nav.classList.toggle("activo");
    });
});

/* CARRITO DE PEDIDOS */
const botonesCarrito = document.querySelectorAll(".addToCart");
const selectMesa = document.querySelector("#numeroMesa");

if (botonesCarrito && selectMesa) {
  botonesCarrito.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nombre = btn.getAttribute("data-nombre");
      const precio = parseInt(btn.getAttribute("data-precio"));
      const mesa = selectMesa.value;

      if (!mesa) {
        alert("⚠️ Debes seleccionar una mesa antes de hacer un pedido");
        selectMesa.focus();
        return;
      }

      // Obtener carrito actual o iniciar vacío
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      // Agregar producto con mesa
      carrito.push({ nombre, precio, mesa });

      // Guardar en localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));

      alert(`✅ ${nombre} agregado al carrito (Mesa ${mesa})`);
    });
  });
}

// ====== MOSTRAR MENÚ DINÁMICO ======
const menuContainer = document.querySelector("#menuContainer");

function renderMenuCliente() {
  let menu = JSON.parse(localStorage.getItem("menu")) || [];
  menuContainer.innerHTML = "";

  if (menu.length === 0) {
    menuContainer.innerHTML = "<p>No hay platos disponibles.</p>";
    return;
  }

  menu.forEach(plato => {
    let div = document.createElement("div");
    div.classList.add("menu-item");

    div.innerHTML = `
      <h3>${plato.nombre}</h3>
      <p><strong>$${plato.precio.toLocaleString("es-CO")}</strong></p>
      ${plato.estado === "Disponible" 
        ? `<button class="addToCart" data-nombre="${plato.nombre}" data-precio="${plato.precio}">Agregar al carrito</button>` 
        : `<p style="color:red;">Agotado</p>`}
    `;
    menuContainer.appendChild(div);
  });

  // Re-asignar eventos de carrito
  const botonesCarrito = document.querySelectorAll(".addToCart");
  const selectMesa = document.querySelector("#numeroMesa");
  if (botonesCarrito && selectMesa) {
    botonesCarrito.forEach((btn) => {
      btn.addEventListener("click", () => {
        const nombre = btn.getAttribute("data-nombre");
        const precio = parseInt(btn.getAttribute("data-precio"));
        const mesa = selectMesa.value;

        if (!mesa) {
          alert("⚠️ Debes seleccionar una mesa antes de hacer un pedido");
          selectMesa.focus();
          return;
        }

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push({ nombre, precio, mesa });
        localStorage.setItem("carrito", JSON.stringify(carrito));

        alert(`✅ ${nombre} agregado al carrito (Mesa ${mesa})`);
      });
    });
  }
}

// Render inicial menú cliente
if (menuContainer) {
  renderMenuCliente();
}


// ====== ANIMACIÓN AL HACER SCROLL EN MENÚ ======
const menuItems = document.querySelectorAll(".menu-item");

function mostrarAnimacion() {
  const triggerBottom = window.innerHeight * 0.85;

  menuItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add("mostrar");
    }
  });
}

window.addEventListener("scroll", mostrarAnimacion);
window.addEventListener("load", mostrarAnimacion);


/* LOGIN */
const loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // evita que el form recargue la página

    const usuario = document.querySelector("#usuario").value.trim();
    const password = document.querySelector("#password").value.trim();


    const userAdmin = "admin"; // EJEMPLO
    const passAdmin = "12345"; // EJEMPLO

    if (usuario === userAdmin && password === passAdmin) {
      alert("✅ Bienvenido, " + usuario);
      window.location.href = "admin.html"; // Redirige al panel administrativo
    } else {
      alert("❌ Usuario o contraseña incorrectos");
    }
  });
}

