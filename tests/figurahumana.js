/* Test de la Figura Humana (Machover)
   Se integra como aplicación independiente (carpeta figurahumana/, sin modificaciones). */
TESTS.push({
 id: "figurahumana",
 categoria: "calif",
 nombre: "Figura humana",
 descripcion: "Test proyectivo de la Figura Humana de Machover, para adultos. Marcas los indicadores del dibujo y obtiene la calificación y la interpretación.",
 tipo: "Calificación",
 etiqueta: "Calificación · Interpretación",
 app: "figurahumana/index.html",
 tema: "figurahumana",   // tema visual de la plataforma (temas/figurahumana.css)
 sesion: {clave: "pe_ok", valor: "1", almacen: "local"},   // sesión que la prueba reutiliza para omitir su inicio de sesión
 almacen: ["pe_eva", "pe_list"],   // datos que la plataforma separa por cuenta
 capturarImpresion: true,   // su informe se imprime: la plataforma guarda una copia en el historial
 liberarSW: true     // usa su propia caché antigua; la plataforma la desactiva para que siempre se actualice
});
