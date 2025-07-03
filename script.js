const formularioContainer = document.getElementById("formulario");
let pasoActual = 0;
const respuestas = {};

function renderPaso() {
  const paso = pasos[pasoActual];
  let html = `<h2>${paso.titulo}</h2><form id="formPaso">`;

  paso.campos.forEach(campo => {
    const nombre = campo.nombre;
    const label = campo.label;

    html += `<label for="${nombre}">${label}</label>`;

    if (campo.tipo === "select") {
      html += `<select name="${nombre}" id="${nombre}">
        <option value="">Seleccione una opción</option>`;
      campo.opciones.forEach(opcion => {
        html += `<option value="${opcion}">${opcion}</option>`;
      });
      html += `</select>`;
    } else {
      html += `<input type="${campo.tipo}" name="${nombre}" id="${nombre}" />`;
    }
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
      const valor = data.get(campo.nombre);
      const campoDependiente = campo.dependienteDe;
      const valorRequerido = campo.valorRequerido;

      if (campoDependiente && respuestas[campoDependiente] !== valorRequerido) continue;

      if (valor.trim() === "") {
        alert("Por favor complete todos los campos obligatorios.");
        valido = false;
        break;
      }
      respuestas[campo.nombre] = valor;
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
  const campos = document.querySelectorAll("select");

  campos.forEach(select => {
    select.addEventListener("change", () => {
      pasos[pasoActual].campos.forEach(campo => {
        if (campo.dependienteDe) {
          const depende = campo.dependienteDe;
          const requerido = campo.valorRequerido;
          const input = document.getElementById(campo.nombre);
          const label = document.querySelector(`label[for="${campo.nombre}"]`);

          if (document.getElementById(depende).value === requerido) {
            input.parentElement.style.display = "block";
            label.style.display = "block";
          } else {
            input.parentElement.style.display = "none";
            label.style.display = "none";
            input.value = "";
          }
        }
      });
    });
  });

  document.querySelectorAll("input, select").forEach(el => {
    el.parentElement.style.display = "block";
  });

  pasos[pasoActual].campos.forEach(campo => {
    if (campo.dependienteDe) {
      const depende = campo.dependienteDe;
      const requerido = campo.valorRequerido;
      const input = document.getElementById(campo.nombre);
      const label = document.querySelector(`label[for="${campo.nombre}"]`);
      if (document.getElementById(depende).value !== requerido) {
        input.parentElement.style.display = "none";
        label.style.display = "none";
        input.value = "";
      }
    }
  });
}

function mostrarResumen() {
  let html = `<h2>Resumen del formulario</h2><ul>`;
  for (const [clave, valor] of Object.entries(respuestas)) {
    const claveLegible = clave.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    html += `<li><strong>${claveLegible}:</strong> ${valor}</li>`;
  }
  html += `</ul>`;
  formularioContainer.innerHTML = html;
}

renderPaso();
