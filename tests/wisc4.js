/* WISC-IV · Escala de Inteligencia de Wechsler para Niños, 4.ª edición
   Se integra como aplicación independiente (carpeta wisc4/, sin modificaciones). */
TESTS.push({
 id: "wisc4",
 categoria: "calif",
 nombre: "WISC-IV",
 descripcion: "Escala de Inteligencia de Wechsler para Niños, 4.ª edición. Calificación e interpretación con informe en PDF.",
 tipo: "Calificación",
 etiqueta: "Calificación · Informe PDF",
 app: "wisc4/index.html",
 sesion: {clave: "wisc.auth", valor: "1"},
 almacen: ["wisc.draft.v1"]   // datos que la plataforma separa por cuenta   // sesión que la prueba reutiliza para omitir su inicio de sesión
});
