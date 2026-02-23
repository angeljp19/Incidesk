import { env } from "../env";


export default class CategoriaTicketAPI {
  static async getAll() {
    try {
      const res = await fetch(`${env.BACK_URL}/categoriaTickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
      });
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
    static async update(id: number, nombre?: string, activo?: boolean) {
    try {
      const res = await fetch(`${env.BACK_URL}/categoriaTickets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({nombre, activo})
      });
      if (!res.ok) {
        throw new Error("Error");
      }
      return;
    } catch (error) {}
  }
    static async create(nombre: string) {
    try {
      const res = await fetch(`${env.BACK_URL}/categoriaTickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({nombre})
      });
      if (!res.ok) {
        throw new Error("Error");
      }
      return;
    } catch (error) {}
  }
}
