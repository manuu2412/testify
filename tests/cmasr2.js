/* CMAS-R2 · Escala de Ansiedad Manifiesta en Niños-Revisada 2
   Se integra como aplicación independiente (carpeta cmasr2/, sin modificaciones). */
TESTS.push({
 id: "cmasr2",
 categoria: "animo",
 nombre: "CMAS-R2",
 descripcion: "Escala de Ansiedad Manifiesta en Niños-Revisada 2. De 6 a 19 años. Genera informe en PDF.",
 tipo: "Aplicación",
 etiqueta: "49 reactivos · Informe PDF",
 app: "cmasr2/index.html",
 tema: "cmasr2",    // tema visual de la plataforma (temas/cmasr2.css)
 sesion: {clave: "u", valor: "manu", usuario: true},   // "usuario": la prueba recibe el nombre de la cuenta activa
 almacen: ["c2_datos", "c2_hist", "c2_resp"]   // datos que la plataforma separa por cuenta
});
