/* Generador de genogramas (McGoldrick y Gerson)
   Se integra como aplicación independiente (carpeta genogramas/, sin modificaciones). */
TESTS.push({
 id: "genogramas",
 categoria: "genogramas",
 nombre: "Generador de genogramas",
 descripcion: "Dibuja genogramas con los símbolos de McGoldrick y Gerson. Permite cargar ejemplos y descargar el resultado en PNG o SVG.",
 tipo: "Herramienta",
 etiqueta: "Herramienta · Descarga PNG / SVG",
 app: "genogramas/index.html",
 sesion: null,   // esta herramienta no tiene inicio de sesión
 precalentarSW: true   // se registra su caché desde la plataforma para que no aparezca un aviso falso de "versión nueva" al abrirla
});
