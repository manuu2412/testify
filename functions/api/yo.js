import {json, usuarioAcceso, esAdmin, manejar} from "../_comun.js";

// Devuelve el correo de quien inició sesión y si es el administrador.
export const onRequestGet = ({request, env}) => manejar(async () => {
  const u = await usuarioAcceso(request, env);
  return json({email: u.email, admin: esAdmin(u.email, env)});
});
