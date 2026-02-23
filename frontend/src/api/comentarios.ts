import { env } from "../env";



export default class ComentariosAPI {
  static async getComentariosById(id: string) {
    try {
      const res = await fetch(`${env.BACK_URL}/comentarios/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
      });

      if (!res.ok) throw new Error("Error al obtener comentarios");

      return await res.json();
    } catch (error) {
      return error;
    }
  }

  static async create(
    ticket_id: number,
    usuario_id: number,
    contenido: string,
    es_nota_interna: boolean
  ) {
    try {
      const res = await fetch(`${env.BACK_URL}/comentarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ticket_id,
          usuario_id,
          contenido,
          es_nota_interna,
        }),
      });
      if (!res.ok) {
        throw new Error("Ha ocurrido un error");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
