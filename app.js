// --- CONEXIÓN A INDEXEDDB ---
const request = indexedDB.open("ProyectoPWD", 1);
let db;

// Se ejecuta la primera vez que se carga la DB o cuando se cambia de versión.
request.onupgradeneeded = (event) => {
  db = event.target.result;
  console.log("Base de datos actualizada.");
  // Creamos un "almacén de objetos" (como una tabla en SQL)
  if (!db.objectStoreNames.contains("registros")) {
    db.createObjectStore("registros", { keyPath: "id", autoIncrement: true });
  }
};

request.onsuccess = (event) => {
  db = event.target.result;
  console.log("Base de datos abierta exitosamente.");
  cargarRegistros(); // Cargamos los datos al iniciar
};

request.onerror = (event) => {
  console.error("Error al abrir la base de datos:", event.target.error);
};

// --- REFERENCIAS DEL DOM ---
const datoInput = document.getElementById("datoInput");
const guardarBtn = document.getElementById("guardarBtn");
const registrosContainer = document.getElementById("registrosContainer");

// --- EVENT LISTENERS ---
guardarBtn.addEventListener("click", () => {
  const codigo = datoInput.value.trim();
  if (codigo) {
    guardarEnDB(codigo);
    datoInput.value = ""; // Limpiamos el input
  } else {
    alert("Por favor, ingresa un codigo.");
  }
});

// --- FUNCIONES ---
function guardarEnDB(codigo) {
  if (!db) {
    console.error("La base de datos no está disponible.");
    return;
  }
  // Creamos una transacción de escritura
  const transaction = db.transaction("registros", "readwrite");
  const store = transaction.objectStore("registros");

  // Creamos el objeto a guardar
  const registro = {
    codigo: codigo,
    fecha: new Date(),
  };

  // Añadimos el objeto al almacén
  const addRequest = store.add(registro);

  addRequest.onsuccess = () => {
    console.log("Codigo guardado en IndexedDB.");
    cargarRegistros(); // Recargamos la lista para mostrar el nuevo dato
  };

  addRequest.onerror = (event) => {
    console.error("Error al guardar el dato:", event.target.error);
  };
}

function cargarRegistros() {
  if (!db) {
    console.error("La base de datos no está disponible.");
    return;
  }
  const transaction = db.transaction("registros", "readonly");
  const store = transaction.objectStore("registros");
  const getAllRequest = store.getAll();

  getAllRequest.onsuccess = () => {
    const registros = getAllRequest.result;
    mostrarRegistrosEnUI(registros);
  };

  getAllRequest.onerror = (event) => {
    console.error("Error al cargar los registros:", event.target.error);
  };
}

function mostrarRegistrosEnUI(registros) {
  registrosContainer.innerHTML = ""; // Limpiamos el contenedor
  if (registros.length === 0) {
    registrosContainer.innerHTML = "<p>No hay registros guardados.</p>";
    return;
  }

  registros.forEach((registro) => {
    const codigo = registro.codigo || registro.nombre || "Sin codigo";
    const item = document.createElement("div");
    item.className = "registro-item";
    item.innerHTML = `
      <strong>${codigo}</strong>
      <span>${new Date(registro.fecha).toLocaleString()}</span>
    `;
    registrosContainer.appendChild(item);
  });
}
