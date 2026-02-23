import { env } from "../env";

export default class UsuarioApi {
  static async getAll(params?: Record<string, any>) {
    try {
      let query = "";
      if (params && Object.keys(params).length > 0) {
        query = "?" + new URLSearchParams(params).toString();
      }
      const res = await fetch(`${env.BACK_URL}/usuarios${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        throw new Error("Verifique las credenciales");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
  static async post(
    nombre: string,
    apellido: string,
    email: string,
    password: string | any,
    departamento_id: number,
    rol_id: number
  ) {
    try {
      const res = await fetch(`${env.BACK_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          password,
          departamento_id,
          rol_id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw {
          status: res.status,
          message: data.message || "Error al crear usuario",
        };
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async put(
    id: number,
    nombre?: string,
    apellido?: string,
    email?: string,
    password?: string,
    rol_id?: number,
    departamento_id?: number
  ) {
    try {
      const res = await fetch(`${env.BACK_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          password,
          departamento_id,
          rol_id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw {
          status: res.status,
          message: data.message || "Error al crear usuario",
        };
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id: number) {
    try {
      const res = await fetch(`${env.BACK_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ activo: false }),
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
