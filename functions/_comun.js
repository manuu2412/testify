// Utilidades compartidas de la API de administración (Cloudflare Pages Functions).
// Aquí viven los secretos (token de Cloudflare): nunca llegan al navegador.

export const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {status, headers: {"Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store"}});

export class ErrorApi extends Error { constructor(status, mensaje) { super(mensaje); this.status = status; } }

const dec = s => new TextDecoder().decode(b64u(s));
const b64u = s => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=")), c => c.charCodeAt(0));
const team = env => String(env.ACCESS_TEAM_DOMAIN || "").trim().replace(/^https?:\/\//, "").replace(/\/+$/, "");

let cache = {t: 0, keys: null};
async function claves(env, forzar) {
  if (!forzar && cache.keys && Date.now() - cache.t < 600000) return cache.keys;
  const r = await fetch(`https://${team(env)}/cdn-cgi/access/certs`);
  if (!r.ok) throw new ErrorApi(500, "No se pudieron obtener las claves de Cloudflare Access.");
  cache = {t: Date.now(), keys: (await r.json()).keys || []};
  return cache.keys;
}

// Valida el token que Cloudflare Access agrega a cada petición (firma, vigencia, emisor y aplicación).
export async function usuarioAcceso(request, env) {
  if (!team(env) || !env.ACCESS_AUD) throw new ErrorApi(500, "Falta configurar ACCESS_TEAM_DOMAIN o ACCESS_AUD.");
  let token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) { const m = (request.headers.get("Cookie") || "").match(/(?:^|;\s*)CF_Authorization=([^;]+)/); token = m && m[1]; }
  if (!token) throw new ErrorApi(401, "No autenticado.");
  const [h, p, s] = token.split(".");
  if (!h || !p || !s) throw new ErrorApi(401, "Token inválido.");
  let cab, pay;
  try { cab = JSON.parse(dec(h)); pay = JSON.parse(dec(p)); } catch { throw new ErrorApi(401, "Token inválido."); }
  if (cab.alg !== "RS256") throw new ErrorApi(401, "Token inválido.");
  let jwk = (await claves(env)).find(k => k.kid === cab.kid) || (await claves(env, true)).find(k => k.kid === cab.kid);
  if (!jwk) throw new ErrorApi(401, "Token inválido.");
  const llave = await crypto.subtle.importKey("jwk", jwk, {name: "RSASSA-PKCS1-v1_5", hash: "SHA-256"}, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", llave, b64u(s), new TextEncoder().encode(h + "." + p));
  const ahora = Math.floor(Date.now() / 1000);
  const auds = String(env.ACCESS_AUD).split(",").map(x => x.trim()).filter(Boolean);
  const aud = [].concat(pay.aud || []);
  if (!ok || !pay.exp || pay.exp < ahora || (pay.nbf && pay.nbf > ahora + 60) || pay.iss !== `https://${team(env)}` || !aud.some(a => auds.includes(a)) || !pay.email)
    throw new ErrorApi(401, "Token inválido o vencido.");
  return {email: String(pay.email).toLowerCase()};
}

export const esAdmin = (email, env) => !!env.ADMIN_EMAIL && email === String(env.ADMIN_EMAIL).trim().toLowerCase();

// Exige administrador y, en cambios, que la petición venga de esta misma página.
export async function soloAdmin(request, env, cambia) {
  const u = await usuarioAcceso(request, env);
  if (!esAdmin(u.email, env)) throw new ErrorApi(403, "Solo el administrador puede hacer esto.");
  if (cambia) {
    const o = request.headers.get("Origin");
    if ((o && o !== new URL(request.url).origin) || request.headers.get("X-TEA") !== "1") throw new ErrorApi(403, "Petición no permitida.");
  }
  return u;
}

async function cf(env, metodo, ruta, cuerpo) {
  if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID) throw new ErrorApi(500, "Falta configurar CF_API_TOKEN o CF_ACCOUNT_ID.");
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}${ruta}`, {
    method: metodo, headers: {"Authorization": `Bearer ${env.CF_API_TOKEN}`, "Content-Type": "application/json"}, body: cuerpo ? JSON.stringify(cuerpo) : undefined});
  let j = null; try { j = await r.json(); } catch {}
  if (!r.ok || !j || !j.success) throw new ErrorApi(502, "Cloudflare rechazó la operación" + (j && j.errors && j.errors[0] ? `: ${j.errors[0].message}` : "."));
  return j.result;
}

const nombreGrupo = env => env.ACCESS_GROUP_NAME || "Usuarios plataforma";
export async function obtenerGrupo(env) {
  const l = await cf(env, "GET", `/access/groups?name=${encodeURIComponent(nombreGrupo(env))}&per_page=50`);
  const g = (l || []).find(x => x.name === nombreGrupo(env));
  if (!g) throw new ErrorApi(500, `No existe el grupo de Access "${nombreGrupo(env)}". Créalo siguiendo la guía.`);
  return g;
}
export const correos = g => (g.include || []).filter(r => r.email && r.email.email).map(r => r.email.email.toLowerCase());
export const limite = env => Math.max(1, parseInt(env.MAX_USUARIOS, 10) || 50);

// Guarda la lista conservando cualquier otra regla que el grupo ya tuviera.
export async function guardarCorreos(env, g, lista) {
  const otras = (g.include || []).filter(r => !(r.email && r.email.email));
  return cf(env, "PUT", `/access/groups/${g.id}`, {name: g.name, include: [...lista.map(e => ({email: {email: e}})), ...otras], exclude: g.exclude || [], require: g.require || []});
}

export const manejar = async fn => { try { return await fn(); } catch (e) { return e instanceof ErrorApi ? json({error: e.message}, e.status) : json({error: "Error interno."}, 500); } };
