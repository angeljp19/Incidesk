import { env } from "../env";



export default class PrioridadesTicketAPI {
  static async getAll() {
    try {
      const res = await fetch(`${env.BACK_URL}/prioridadTickets`, {
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
  static async create(nombre: string) {
    try {
      const res = await fetch(`${env.BACK_URL}/prioridadTickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({ nombre }),
      });
      if (!res.ok) {
        throw new Error("Error");
      }
      return;
    } catch (error) {}
  }
}
