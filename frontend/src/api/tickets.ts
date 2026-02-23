import { env } from "../env";

export default class TicketAPI {
  static async getAll(params?: Record<string, any>) {
    try {
      let query = "";

      if (params && Object.keys(params).length > 0) {
        query = "?" + new URLSearchParams(params).toString();
      }

      const res = await fetch(`${env.BACK_URL}/tickets${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
      });

      if (!res.ok) throw new Error("Error al obtener tickets");

      return await res.json();
    } catch (error) {
      return error;
    }
  }

  // -----------------------------------------
  // Obtener un ticket por ID
  // -----------------------------------------
  static async getById(id: number) {
    try {
      const res = await fetch(`${env.BACK_URL}/tickets/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
      });

      if (!res.ok) throw new Error("Error al obtener ticket");

      return await res.json();
    } catch (error) {
      return error;
    }
  }

  // -----------------------------------------
  // Crear ticket (con archivo opcional)
  // -----------------------------------------
  static async create(formData: FormData) {
    try {
      const res = await fetch(`${env.BACK_URL}/tickets`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al crear ticket");

      return await res.json();
    } catch (error) {
      return error;
    }
  }

  // -----------------------------------------
  // Actualizar ticket
  // (con archivo opcional también)
  // -----------------------------------------
  static async finalizar(id: number, estado_id: number, solucion_final:string) {
    try {
      const fecha_cierre = new Date().toISOString();
      const res = await fetch(`${env.BACK_URL}/tickets/${id}`, {
        method: "PUT",
        body: JSON.stringify({ estado_id, solucion_final, fecha_cierre}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
      });

      if (!res.ok) throw new Error("Error al actualizar ticket");

      return await res.json();
    } catch (error) {
      return error;
    }
  }
  static async calificar(id: number, calificacion: string) {
    try {
      const res = await fetch(`${env.BACK_URL}/tickets/${id}`, {
        method: "PUT",
        body: JSON.stringify({calificacion}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
      });

      if (!res.ok) throw new Error("Error al actualizar ticket");

      return await res.json();
    } catch (error) {
      return error;
    }
  }
  static async update(id: number, formData: FormData) {
    try {
      const res = await fetch(`${env.BACK_URL}/tickets/${id}`, {
        method: "PUT",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw {
          status: res.status,
          message: data.message || "Error al actualizar el ticket",
        };
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  // -----------------------------------------
  // Eliminar ticket
  // -----------------------------------------
  static async delete(id: number) {
    try {
      const res = await fetch(`${env.BACK_URL}/tickets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });

      if (!res.ok) throw new Error("Error al eliminar ticket");

      return await res.json();
    } catch (error) {
      return error;
    }
  }
}
