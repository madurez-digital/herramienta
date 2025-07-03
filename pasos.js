const provincias = [
  "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza",
  "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
  "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego",
  "Tucumán", "Ciudad Autónoma de Buenos Aires"
];

const pasos = [
  {
    titulo: "A. Relevamiento inicial",
    campos: [
      { tipo: "date", nombre: "fecha_envio", label: "Fecha de envío del formulario" },
      { tipo: "select", nombre: "reunion_virtual", label: "¿Se realizó reunión virtual?", opciones: ["Sí", "No"] },
      { tipo: "date", nombre: "fecha_reunion", label: "Fecha de la reunión virtual (si corresponde)", dependienteDe: "reunion_virtual", valorRequerido: "Sí" },
      { tipo: "select", nombre: "visita_planta", label: "¿Se realizó visita a planta?", opciones: ["Sí", "No"] },
      { tipo: "date", nombre: "fecha_visita", label: "Fecha de la visita a planta (si corresponde)", dependienteDe: "visita_planta", valorRequerido: "Sí" }
    ]
  },
  {
    titulo: "B. Datos del Consultor/es",
    campos: [
      { tipo: "text", nombre: "consultor_nombre", label: "Nombre y Apellido del Consultor/a" },
      {
        tipo: "select",
        nombre: "consultor_institucion",
        label: "Institución a la que pertenece",
        opciones: ["UNICEN. Universidad Nacional del Centro de la Provincia de Buenos Aires"]
      },
      {
        tipo: "select",
        nombre: "consultor_carrera",
        label: "Carrera a la que pertenece",
        opciones: [
          "Ingeniería Industrial",
          "Ingeniería Electromecánica",
          "Ingeniería Civil",
          "Ingeniería Química",
          "Ingeniería en Agrimensura"
        ]
      }
    ]
  },
  {
    titulo: "C. Datos generales de la empresa",
    campos: [
      { tipo: "text", nombre: "razon_social", label: "Razón social" },
      { tipo: "text", nombre: "cuit", label: "CUIT" },
      { tipo: "url", nombre: "web", label: "Página web" },
      { tipo: "email", nombre: "empresa_correo", label: "Correo electrónico" },
      { tipo: "tel", nombre: "empresa_telefono", label: "Teléfono" },
      { tipo: "text", nombre: "localidad", label: "Localidad" },
      { tipo: "select", nombre: "provincia", label: "Provincia", opciones: provincias },
      { tipo: "text", nombre: "sector", label: "Sector o rubro industrial" },
      { tipo: "number", nombre: "superficie_cubierta", label: "Superficie cubierta (m²)" },
      { tipo: "number", nombre: "superficie_total", label: "Superficie total (m²)" },
      { tipo: "number", nombre: "capacidad_utilizada", label: "% de capacidad utilizada" },
      {
        tipo: "select",
        nombre: "empleados",
        label: "Cantidad de empleados",
        opciones: ["1-10", "11-50", "51-100", "101-250", "Más de 250"]
      },
      { tipo: "number", nombre: "antiguedad_empresa", label: "Antigüedad de la empresa (años)" }
    ]
  },
  {
    titulo: "D. Datos de contacto",
    campos: [
      { tipo: "text", nombre: "contacto_nombre", label: "Nombre de contacto" },
      { tipo: "email", nombre: "contacto_correo", label: "Correo electrónico de contacto" },
      { tipo: "tel", nombre: "contacto_telefono", label: "Teléfono de contacto" },
      { tipo: "text", nombre: "contacto_cargo", label: "Cargo de contacto" },
      { tipo: "number", nombre: "contacto_antiguedad", label: "Antigüedad en la empresa (años)" }
    ]
  }
];
