/* WISC-V · Escala de Inteligencia de Wechsler para Niños, 5.ª edición
   Se integra como aplicación independiente (carpeta wiscv/, sin modificaciones). */
TESTS.push({
 id: "wiscv",
 categoria: "calif",
 nombre: "WISC-V",
 descripcion: "Escala de Inteligencia de Wechsler para Niños, 5.ª edición. Capturas las puntuaciones y calcula sumas por índice, perfil, interpretabilidad e informe en PDF.",
 tipo: "Calificación",
 etiqueta: "Calificación · Informe PDF",
 app: "wiscv/index.html",
 tema: "wiscv",     // tema visual de la plataforma (temas/wiscv.css)
 sesion: {clave: "wiscv.auth", valor: "1"},
 almacen: ["wiscv.evals", "wiscv.cur"]   // datos que la plataforma separa por cuenta   // sesión que la prueba reutiliza para omitir su inicio de sesión
});
