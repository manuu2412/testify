/* ============================================================
   GARS-3 · Escala de Calificación Gilliam sobre Autismo, 3.ª ed.
   Lógica y baremos tomados del Excel proporcionado:
   hoja "GARS-3 Modificado" (ítems) y "GARS 3 Datos Resultados" (calificación).
   ============================================================ */
(function () {
 const TAB = {"CRR":[[4,2],[4,2],[4,2],[4,2],[5,3],[5,3],[5,3],[6,9],[6,9],[6,9],[7,16],[7,16],[7,16],[7,16],[8,25],[8,25],[8,25],[9,37],[9,37],[9,37],[10,50],[10,50],[10,50],[11,63],[11,63],[11,63],[11,63],[12,75],[12,75],[12,75],[13,84],[13,84],[13,84],[14,91],[14,91],[14,91],[14,91],[15,95],[15,95],[15,95]],"IS":[[3,1],[4,2],[4,2],[4,2],[4,2],[5,3],[5,3],[5,3],[5,3],[6,9],[6,9],[6,9],[6,9],[7,16],[7,16],[7,16],[8,25],[8,25],[8,25],[8,25],[9,37],[9,37],[9,37],[9,37],[10,50],[10,50],[10,50],[10,50],[11,63],[11,63],[11,63],[12,75],[12,75],[12,75],[12,75],[12,75],[13,84],[13,84],[13,84],[14,91],[14,91],[14,91],[14,91]],"CS":[[2,"<1"],[2,"<1"],[3,1],[3,1],[3,1],[4,2],[4,2],[4,2],[4,2],[5,3],[5,3],[5,3],[6,9],[6,9],[7,16],[7,16],[7,16],[8,25],[8,25],[9,37],[9,37],[9,37],[10,50],[10,50],[11,63],[11,63],[12,75],[12,75]],"RE":[[3,1],[3,1],[4,2],[4,2],[4,2],[5,3],[5,3],[6,9],[6,9],[7,16],[7,16],[8,25],[8,25],[9,37],[9,37],[10,50],[10,50],[11,63],[11,63],[12,75],[12,75],[13,84],[13,84],[14,91],[14,91]],"EC":[[5,3],[6,9],[7,16],[7,16],[8,25],[8,25],[8,25],[9,37],[9,37],[10,50],[10,50],[11,63],[11,63],[11,63],[12,75],[12,75],[13,84],[13,84],[14,91],[14,91],[15,95],[15,95]],"LD":[[5,3],[6,9],[6,9],[7,16],[7,16],[8,25],[9,37],[9,37],[10,50],[10,50],[11,63],[11,63],[12,75],[12,75],[13,84],[13,84],[14,91],[15,95],[15,95],[16,98],[16,98],[17,99]]};   // por subescala: índice = PB → [PE, percentil]
 const IDX6 = {"20":[42,"<1"],"21":[43,"<1"],"22":[44,"<1"],"23":[46,"<1"],"24":[47,"<1"],"25":[49,"<1"],"26":[50,"<1"],"27":[52,"<1"],"28":[53,"<1"],"29":[55,"<1"],"30":[56,"<1"],"31":[58,"<1"],"32":[59,"<1"],"33":[61,"<1"],"34":[62,"<1"],"35":[63,"<1"],"36":[65,1],"37":[66,1],"38":[68,1],"39":[69,2],"40":[71,3],"41":[72,3],"42":[74,4],"43":[75,5],"44":[77,6],"45":[78,7],"46":[80,9],"47":[81,10],"48":[83,13],"49":[84,14],"50":[86,18],"51":[87,19],"52":[89,23],"53":[90,25],"54":[92,30],"55":[93,32],"56":[94,35],"57":[96,39],"58":[97,42],"59":[99,47],"60":[100,50],"61":[102,55],"62":[103,58],"63":[105,63],"64":[106,65],"65":[108,70],"66":[109,73],"67":[111,77],"68":[112,79],"69":[114,82],"70":[115,84],"71":[117,87],"72":[118,89],"73":[120,91],"74":[121,92],"75":[122,93],"76":[124,95],"77":[125,95],"78":[127,97],"79":[128,98],"80":[130,98],"81":[131,99],"82":[133,99],"83":[134,99],"84":[136,">99"],"85":[137,">99"],"86":[139,">99"],"87":[140,">99"],"88":[141,">99"],"89":[142,">99"],"90":[143,">99"],"91":[144,">99"],"92":[145,">99"],"93":[146,">99"],"94":[147,">99"],"95":[148,">99"],"96":[149,">99"],"97":[150,">99"],"98":[151,">99"],"99":[152,">99"]}; // suma de PE (6 subescalas) → [Índice, percentil]
 const IDX4 = {"1":[40,"<1"],"2":[41,"<1"],"3":[42,"<1"],"4":[43,"<1"],"5":[44,"<1"],"6":[45,"<1"],"7":[46,"<1"],"8":[47,"<1"],"9":[48,"<1"],"10":[49,"<1"],"11":[50,"<1"],"12":[52,"<1"],"13":[53,"<1"],"14":[55,"<1"],"15":[57,"<1"],"16":[59,"<1"],"17":[60,"<1"],"18":[62,"<1"],"19":[63,"<1"],"20":[66,1],"21":[67,1],"22":[69,2],"23":[71,3],"24":[73,3],"25":[74,4],"26":[76,5],"27":[78,7],"28":[79,8],"29":[81,10],"30":[83,13],"31":[85,16],"32":[86,18],"33":[88,21],"34":[90,25],"35":[92,30],"36":[93,35],"37":[95,37],"38":[97,42],"39":[99,47],"40":[100,50],"41":[102,55],"42":[104,61],"43":[106,65],"44":[107,68],"45":[109,73],"46":[111,77],"47":[112,79],"48":[114,82],"49":[116,86],"50":[118,89],"51":[119,90],"52":[121,92],"53":[123,94],"54":[125,95],"55":[126,96]}; // suma de PE (4 subescalas) → [Índice, percentil]

 const ESC = [
  {n: "Conductas Restrictivas/Repetidas", k: "CRR", a: 0,  b: 13, d: "mide conductas estereotipadas, intereses fijos, rutinas o rituales."},
  {n: "Interacción Social",               k: "IS",  a: 13, b: 27, d: "mide déficits en las conductas sociales."},
  {n: "Comunicación Social",              k: "CS",  a: 27, b: 36, d: "mide la calidad de la respuesta ante situaciones sociales y la comprensión de la intención de interacción y comunicación social."},
  {n: "Respuesta Emocional",              k: "RE",  a: 36, b: 44, d: "mide las respuestas emocionales extremas ante situaciones cotidianas. No forma parte del criterio para evaluar el TEA, pero contribuye de forma importante al panorama general del diagnóstico."},
  {n: "Estilo Cognitivo",                 k: "EC",  a: 44, b: 51, d: "mide intereses fijos idiosincráticos, así como características y habilidades cognoscitivas."},
  {n: "Lenguaje Desadaptativo",           k: "LD",  a: 51, b: 58, d: "mide déficits e idiosincrasias en la comunicación verbal."}
 ];
 // Componentes DSM-5 (ítems 0-based): A = ítems 14-36, 47 y 51; B = el resto
 const A = []; for (let i = 13; i <= 35; i++) A.push(i); A.push(46, 50);
 const OMIT = i => i >= 44;                 // ítems 45-58 se omiten si es mudo
 const sum = (r, a, b) => r.slice(a, b).reduce((s, x) => s + x.valor, 0);

 const cat = i =>
  i < 54  ? {n: "Poco probable. Sin Autismo", t: "Las conductas observadas no sugieren un patrón compatible con trastorno del espectro autista (TEA)."} :
  i < 71  ? {n: "Probable Nivel 1. Requiere apoyo mínimo", t: "Se observan conductas compatibles con TEA. De confirmarse el diagnóstico, correspondería al Nivel 1 del DSM-5 (requiere apoyo mínimo)."} :
  i < 101 ? {n: "Muy probable Nivel 2. Requiere apoyo sustancial", t: "Se observan numerosas conductas compatibles con TEA. De confirmarse el diagnóstico, correspondería al Nivel 2 del DSM-5 (requiere apoyo sustancial)."} :
            {n: "Muy probable Nivel 3. Requiere mucho apoyo sustancial", t: "Se observa un patrón muy marcado de conductas compatibles con TEA. De confirmarse el diagnóstico, correspondería al Nivel 3 del DSM-5 (requiere mucho apoyo sustancial)."};
 const nivelPE = pe => pe <= 7 ? "por debajo del promedio" : pe <= 12 ? "dentro del promedio" : pe <= 14 ? "por encima del promedio" : "muy por encima del promedio";
 const cierre = i =>
  i < 54  ? "Si persisten dudas clínicas, se sugiere ampliar la valoración con otras fuentes de información." :
  i < 71  ? "Se sugiere complementar con entrevista clínica, observación directa y otros instrumentos (por ejemplo ADOS-2 o ADI-R) antes de emitir un diagnóstico." :
  i < 101 ? "Se sugiere confirmar con evaluación especializada (entrevista clínica, observación directa, ADOS-2/ADI-R) y valorar un plan de intervención y apoyos." :
            "Se recomienda derivar a evaluación diagnóstica especializada y planear apoyos intensivos de forma prioritaria.";

 TESTS.push({
  id: "gars3",
  nombre: "GARS-3",
  nombreCompleto: "Escala de Calificación Gilliam sobre Autismo, 3.ª edición (GARS-3)",
  descripcion: "Escala de Calificación Gilliam sobre Autismo, 3.ª edición (James Gilliam). De 3 a 22 años. Contestan padres, maestros o cuidadores. 5 a 10 minutos.",
  categoria: "neuro",
  tipo: "Aplicación",
  paraPadres: true,
  edadMin: 3, edadMax: 22,
  generales: {
   sexos: ["Masculino", "Femenino"],
   niveles: ["Maternal","1er nivel","2do nivel","3er nivel","1er grado","2do grado","3er grado","4to grado","5to grado","6to grado","1er año","2do año","3er año","4to año","5to año","Universitario"],
   evaluadores: ["Madre","Padre","Familia","Cuidador","Docente","Otro"]
  },
  instrucciones: "Evalúe cada ítem según cuán adecuadamente describe la conducta del individuo. Seleccione la opción que mejor describa, en su observación, las conductas típicas de la persona en circunstancias ordinarias (en la mayoría de los lugares, junto a personas familiares y en actividades cotidianas). Evalúe todos los ítems. Si tiene dudas sobre cómo evaluar un ítem, demore la evaluación y observe a la persona por un período de 6 horas. Cada opción se lee como «… al evaluado».",
  opciones: [
   {texto: "No se parece en nada", valor: 0},
   {texto: "No se parece mucho", valor: 1},
   {texto: "Se parece de alguna manera", valor: 2},
   {texto: "Se parece mucho", valor: 3}
  ],
  bloques: [{"titulo":"Conductas Restrictivas / Repetidas","items":["Si está solo, la mayoría de las veces el individuo hará conductas repetidas (como morderse las uñas, morderse los labios o morderse las mejillas o preocupación persistente e intensa) y estereotipadas (movimientos de la cabeza, el cuerpo y las manos que son anormales en el desarrollo).","Se preocupa por estímulos específicos","Agita las manos, objetos o articulos en el medio por lo menos por 5 minutos","Agita rápidamente sus dedos o manos frente a sus ojos por 5 segundos o más.","Arremete en forma rápida, haciendo movimientos ràpidos de un lugar a otro.","Agita rápidamente sus dedos o manos frente de la cara o a los lados.","Produce sonidos agudos (por ejemplo: eee-eee-eee-eee) u otras vocalizaciones para autoestimularse.","Usa juguetes u objetos inapropiadamente (por ejemplo: gira carros, toma parte de juguetes de acción por separado)","Hace ciertas cosas repetidamente, ritualisticamente.","Participa en comportamientos estereotipados cuando juega con juguetes u objetos.","Repite sonidos inteligibles (balbuceos) una y otra vez.","Muestra intereses inusuales en aspectos sensoriales de materiales de juego, partes del cuerpo u objetos.","Manifiesta comportamientos ritualistas u obsesivos."]},{"titulo":"Interacción Social","items":["No inicia conversaciones con pares u otras personas.","Presta poca o ninguna atención a lo que hacen sus pares.","Falla al imitar a otras personas en juegos o en actividades de aprendizaje.","No sigue los gestos (señales) de otras personas para buscar algo (Por ejemplo: cuando otra persona mueve la cabeza, señala o usa otras señales del lenguaje corporal).","Parece indiferente a la atención de otras personas (no trata de lograr, dirigir o mantener la atención de otra persona).","Muestra mínima expresión de placer cuando interactúa con otra persona.","Manifiesta poca o ninguna excitación al mostrar sus juguetes u objetos a otros.","Muestra desinterés en señalar cosas del ambiente a otros.","Parece poco dispuesto o reacio en lograr la interacción con él o ella.","Muestra un mínimo o ninguna respuesta cuando otros intentan interacatuar con él o ella.","Manifiesta poca o ninguna interacción social (Por ejemplo: no dice voluntariamente \"adiós\" en respuesta a otra persona que le dice \"adiós\").","No trata de hacer amigos con otras personas.","Falla en lograr la atención en juegos creativos, imaginativos.","Muestra poco o ningún interés en otras personas."]},{"titulo":"Comunicación Social","items":["Responde inadecuadamente a estímulos de humor (Por ejemplo: no ríe ante chistes, comics, historias alegres).","Tiene dificultad para comprende los chistes.","Tiene dificultad para comprender expresiones jergas.","Tiene dificultad para comprender cuando alguien está bromeando, tomando el pelo.","Tiene dificultad para comprender cuando él o ella está haciendo el ridículo.","Tiene dificultad para comprender la causa del porque la gente le tiene antipatía.","Falla en predecir posibles consecuencias en eventos sociales.","No parece comprender por qué la gente tiene pensamientos y sentimientos diferentes de él o ella.","No parece comprender por qué otras personas no conocen algo."]},{"titulo":"Respuesta Emocional","items":["Necesita ser consolado en exceso si le cambian algo o le va mal.","Se frustra rapidamente si no logra hacer algo.","Humor rabioso cuando se frustra.","Se molesta cuando le cambian la rutina.","Responde negativamente cuando le dan reglas, solicitudes o indicaciones.","Tiene reacciones extremas (Por ejemplo: llora, gritos, rabia)","Humor rabioso cuando no consigue algo-","Humor rabioso cuando se le pide que deje de hacer algo que él o ella está disfrutando."]},{"filtro":{"id":"mudo","texto":"¿Es un individuo mudo? Si la respuesta es SÍ, no responda las siguientes dos escalas.","opciones":["Sí","No"]}},{"titulo":"Estilo Cognitivo","dependeDe":"mudo","items":["Usa el lenguaje excepcionalmente preciso.","Uso muy concreto del significado de las palabras.","Habla de un sujeto excesivamente simple.","Manifiesta un conocimiento superior o destrezas en temas específicas.","Manifiesta excelente memoria.","Muestra un interés intenso, obsesivo en temas intelectualmente específicos.","Hace comentarios ingenuos (sin tomar conciencia de la reacción de los otros)."]},{"titulo":"Lenguaje Desadaptativo","dependeDe":"mudo","items":["Repite verbalmente palabras (ecos) o frases o gestos.","Repite palabras fuera de contexto (repite palabras o frases escuchadas con anterioridad)","Habla (o hace gestos) en tono plano, conmovido.","Usa “sí” y “no” inapropiadamente. Dice “sí” cuando se le ofrece algo que no le gusta o dice “no” cuando se le pregunta si él o ella quiere un juguete o dulce favorito.","Usa \"él\" o \"ella\" para referirse a \"sí mismo\".","Uso del discurso en tono, volumen o velocidad anormal.","Utiliza palabras o frases idiosincráticas que no tienen significado para los demás."]}],

  calificar(resp, ctx) {
   const mudo = (ctx.filtros.mudo === "Sí");
   const esc = ESC.map(e => {
    const ap = !(mudo && (e.k === "EC" || e.k === "LD"));
    const pb = ap ? sum(resp, e.a, e.b) : null;
    const [pe, pc] = ap ? TAB[e.k][pb] : [null, null];
    return {n: e.n, k: e.k, d: e.d, ap, pb, pe, pc};
   });
   const s4 = esc.slice(0, 4).reduce((s, e) => s + e.pe, 0), i4 = IDX4[s4];
   const s6 = mudo ? null : esc.reduce((s, e) => s + e.pe, 0), i6 = mudo ? null : IDX6[s6];
   const princ = mudo ? {i: i4[0], pc: i4[1], tipo: "4 subescalas"} : {i: i6[0], pc: i6[1], tipo: "6 subescalas"};
   const cA = resp.reduce((n, r, i) => n + (r && A.includes(i) && r.valor >= 1 ? 1 : 0), 0);
   const cB = resp.reduce((n, r, i) => n + (r && !A.includes(i) && r.valor >= 1 ? 1 : 0), 0);
   const dA = A.filter(i => !(mudo && OMIT(i))).length, dB = 58 - A.length - (mudo ? 12 : 0);

   const L = ["Subescalas (PB = puntaje bruto, PE = puntaje estándar, % = percentil, SEM = error estándar):"];
   esc.forEach((e, i) => L.push(e.ap ? `${i + 1}. ${e.n}: PB ${e.pb} | PE ${e.pe} | % ${e.pc} | SEM 1`
                                    : `${i + 1}. ${e.n}: no aplica (individuo mudo)`));
   L.push("");
   if (mudo) L.push("Índice de 6 subescalas: no aplica (individuo mudo; se usa el índice de 4 subescalas).");
   else L.push(`Suma de PE (6 subescalas): ${s6}`, `Índice de Autismo (6 subescalas): ${i6[0]} | % ${i6[1]} | SEM 6`, `Probabilidad de TEA y nivel de severidad (DSM-5): ${cat(i6[0]).n}`);
   L.push("", `Suma de PE (4 subescalas): ${s4}`, `Índice de Autismo (4 subescalas): ${i4[0]} | % ${i4[1]} | SEM 4`, `Probabilidad de TEA y nivel de severidad (DSM-5): ${cat(i4[0]).n}`,
    "", "Conductas presentes (respuesta distinta de «No se parece en nada»):",
    `A) Déficits en comunicación e interacción social: ${cA} de ${dA}`,
    `B) Intereses o actividades restrictivas repetitivas: ${cB} de ${dB}`);
   return {total: princ.i, esc, mudo, s4, i4, s6, i6, princ, cA, dA, cB, dB, lineas: L};
  },

  interpretar(c) {
   const p = c.princ, k = cat(p.i), P = [];
   P.push(`Resultado global (${p.tipo}): Índice de Autismo ${p.i}, percentil ${p.pc}. ${k.n}.`, k.t);
   if (!c.mudo) { const k4 = cat(c.i4[0]); if (k4.n !== k.n) P.push(`Como referencia, el índice de 4 subescalas (${c.i4[0]}) corresponde a: ${k4.n}.`); }
   P.push("Por subescala (promedio de PE = 10; lectura orientativa):");
   c.esc.forEach(e => { if (e.ap) P.push(`• ${e.n}: PE ${e.pe}, ${nivelPE(e.pe)}. Esta subescala ${e.d}`); });
   if (c.mudo) P.push("Estilo Cognitivo y Lenguaje Desadaptativo no se calificaron porque el individuo es mudo.");
   const sinA = c.cA === 0, sinB = c.cB === 0;
   P.push(`Componentes DSM-5: se registran ${c.cA} de ${c.dA} conductas de déficits en comunicación e interacción social y ${c.cB} de ${c.dB} de intereses o actividades restrictivas repetitivas.` +
    (sinA || sinB ? " Uno de los dos componentes no presenta ninguna conducta, lo que debe considerarse al valorar el cuadro." : ""));
   P.push(cierre(p.i));
   P.push("Nota: esta interpretación es orientativa y no sustituye el juicio clínico; el diagnóstico de TEA debe integrar entrevista, observación directa y otros instrumentos.");
   return P.join("\n\n");
  }
 });
})();
