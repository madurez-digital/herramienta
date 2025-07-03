const formularioContainer = document.getElementById("formulario");
let pasoActual = 0;
const respuestas = {};

function renderPaso() {
  const paso = pasos[pasoActual];
  let html = `<h2>${paso.titulo}</h2><form id="formPaso">`;

  paso.campos.forEach(campo => {
    html += `<label for="${campo.nombre}">${campo.label}</label>`;

    if (campo.tipo === "select") {
      html += `<select name="${campo.nombre}" id="${campo.nombre}">
        <option value="">Seleccione una opción</option>`;
      campo.opciones.forEach(opcion => {
        html += `<option value="${opcion}">${opcion}</option>`;
      });
      html += `</select>`;
    } else if (campo.tipo === "textarea") {
      html += `<textarea name="${campo.nombre}" id="${campo.nombre}" rows="4"></textarea>`;
    } else {
      html += `<input type="${campo.tipo}" name="${campo.nombre}" id="${campo.nombre}" />`;
    }
  });

  html += `<div class="botones">`;

  if (pasoActual > 0) {
    html += `<button type="button" onclick="anteriorPaso()">Anterior</button>`;
  }

  html += `<button type="submit">${pasoActual === pasos.length - 1 ? "Finalizar" : "Siguiente"}</button>`;
  html += `</div></form>`;

  formularioContainer.innerHTML = html;

  document.getElementById("formPaso").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(this);
    let valido = true;

    for (const [key, value] of data.entries()) {
      if (value.trim() === "") {
        alert("Por favor complete todos los campos.");
        valido = false;
        break;
      }
      respuestas[key] = value;
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

function mostrarResumen() {
  let html = `<h2>Resumen del formulario</h2><ul>`;
  for (const [clave, valor] of Object.entries(respuestas)) {
    html += `<li><strong>${clave.replace(/_/g, " ")}:</strong> ${valor}</li>`;
  }
  html += `</ul>`;
  formularioContainer.innerHTML = html;
}

renderPaso();
