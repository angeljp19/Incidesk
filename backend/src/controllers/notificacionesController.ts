import { Request, Response } from "express";
import Notificaciones from "../models/Notificaciones";
import Usuario from "../models/Usuario";

class NotificacionesController {
  static async getAll(req: Request, res: Response) {
    try {
      const departamentos = await Notificaciones.findAll({
        order: [["fecha", "DESC"]],
        include: [
          {
            model: Usuario,
            as: "receptor",
            attributes: ["id", "nombre", "apellido"],
          },
        ],
      });
      return res.json(departamentos);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al obtener las notificaciones" });
    }
  }
}

export default NotificacionesController;
