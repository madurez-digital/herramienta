const formularioContainer = document.getElementById("formulario");
let pasoActual = 0;
const respuestas = {};

function renderPaso() {
  const paso = pasos[pasoActual];
  let html = `<h2>${paso.titulo}</h2><form id="formPaso">`;

  paso.campos.forEach(campo => {
    const id = campo.nombre;
    const label = campo.label;

    html += `<div class="campo" id="wrapper_${id}">`;
    html += `<label for="${id}">${label}</label>`;

    if (campo.tipo === "select") {
      html += `<select name="${id}" id="${id}">
        <option value="">Seleccione una opción</option>`;
      campo.opciones.forEach(opcion => {
        html += `<option value="${opcion}">${opcion}</option>`;
      });
      html += `</select>`;
    } else {
      html += `<input type="${campo.tipo}" name="${id}" id="${id}" />`;
    }

    html += `</div>`;
  });

  html += `<div class="botones">`;
  if (pasoActual > 0) {
    html += `<button type="button" onclick="anteriorPaso()">Anterior</button>`;
  }
  html += `<button type="submit">${pasoActual === pasos.length - 1 ? "Finalizar" : "Siguiente"}</button>`;
  html += `</div></form>`;

  formularioContainer.innerHTML = html;

  aplicarCondicionales();

  document.getElementById("formPaso").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(this);
    let valido = true;

    for (const campo of pasos[pasoActual].campos) {
      const nombre = campo.nombre;
      const dependiente = campo.dependienteDe;
      const requerido = campo.valorRequerido;
      const valor = data.get(nombre);

      // Si el campo es condicional y no debe mostrarse, saltearlo
      if (dependiente && respuestas[dependiente] !== requerido) continue;

      if (!valor || valor.trim() === "") {
        alert("Por favor complete todos los campos obligatorios.");
        valido = false;
        break;
      }

      respuestas[nombre] = valor;
    }

    if (!valido) return;

    if (pasoActual < pasos.length - 1) {
      pasoActual++;
      renderPaso();
    } else {
      mostrarResumen();
    }
  });
}

function anteriorPaso() {
  pasoActual--;
  renderPaso();
}

function aplicarCondicionales() {
  pasos[pasoActual].campos.forEach(campo => {
    if (campo.dependienteDe) {
      const depende = campo.dependienteDe;
      const requerido = campo.valorRequerido;
      const controlador = document.getElementById(depende);
      const wrapper = document.getElementById("wrapper_" + campo.nombre);

      const update = () => {
        wrapper.style.display = (controlador.value === requerido) ? "block" : "none";
      };

      controlador.addEventListener("change", update);
      update();
    }
  });
}

function mostrarResumen() {
  let html = `<h2>Resumen del formulario</h2><ul>`;
  for (const [clave, valor] of Object.entries(respuestas)) {
    const claveLegible = clave
      .replace(/_/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());
    html += `<li><strong>${claveLegible}:</strong> ${valor}</li>`;
  }
  html += `</ul>`;
  formularioContainer.innerHTML = html;
}

renderPaso();
