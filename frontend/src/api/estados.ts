import { env } from "../env";



export default class EstadoTicketAPI {
  static async getAll() {
    try {
      const res = await fetch(`${env.BACK_URL}/estadoTickets`, {
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
}
