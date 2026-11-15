import {json, ErrorApi, soloAdmin, obtenerGrupo, correos, guardarCorreos, limite, manejar} from "../_comun.js";

const valido = e => typeof e === "string" && e.length <= 254 && /^[^\s@,;<>()"']+@[^\s@,;<>()"']+\.[^\s@,;<>()"']{2,}$/.test(e);
const leer = async r => { try { const j = await r.json(); return String(j.email || "").trim().toLowerCase(); } catch { return ""; } };
const respuesta = (env, lista, admin) => json({usuarios: lista, admin, limite: limite(env)});

// GET: lista · POST: agrega {email} · DELETE: quita {email}. Solo el administrador.
export const onRequest = ({request, env}) => manejar(async () => {
  const m = request.method;
  if (!["GET", "POST", "DELETE"].includes(m)) throw new ErrorApi(405, "Método no permitido.");
  const adm = await soloAdmin(request, env, m !== "GET");
  const g = await obtenerGrupo(env);
  let lista = correos(g);
  if (m === "GET") return respuesta(env, lista, adm.email);
  const email = await leer(request);
  if (!valido(email)) throw new ErrorApi(400, "Escribe un correo válido.");
  if (m === "POST") {
    if (lista.includes(email)) throw new ErrorApi(409, "Ese correo ya tiene acceso.");
    if (lista.length >= limite(env)) throw new ErrorApi(409, `Se alcanzó el límite de ${limite(env)} usuarios.`);
    lista = [...lista, email];
  } else {
    if (email === adm.email) throw new ErrorApi(400, "No puedes quitar tu propia cuenta de administrador.");
    if (!lista.includes(email)) throw new ErrorApi(404, "Ese correo no está en la lista.");
    lista = lista.filter(e => e !== email);
  }
  await guardarCorreos(env, g, lista);
  return respuesta(env, lista, adm.email);
});
