const formularioContainer = document.getElementById("formulario");
let pasoActual = 0;
const respuestas = {};

function mostrarPaso() {
  const paso = pasos[pasoActual];
  let html = `<h2>${paso.titulo}</h2><form id="formPaso">`;

  paso.campos.forEach(campo => {
    html += `<label>${campo.label}</label>`;
    if (campo.tipo === "textarea") {
      html += `<textarea name="${campo.nombre}" rows="4"></textarea>`;
    } else {
      html += `<input type="${campo.tipo}" name="${campo.nombre}" />`;
    }
  });

  html += `<button type="submit">Siguiente</button></form>`;
  formularioContainer.innerHTML = html;

  document.getElementById("formPaso").addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(this);
    for (const [key, value] of data.entries()) {
      respuestas[key] = value;
    }
    pasoActual++;
    if (pasoActual < pasos.length) {
      mostrarPaso();
    } else {
      mostrarResumen();
    }
  });
}

function mostrarResumen() {
  let html = `<h2>Resumen</h2><ul>`;
  for (const [clave, valor] of Object.entries(respuestas)) {
    html += `<li><strong>${clave}:</strong> ${valor}</li>`;
  }
  html += `</ul>`;
  formularioContainer.innerHTML = html;
}

mostrarPaso();
