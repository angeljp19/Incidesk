import { Request, Response } from "express";
import EstadoTicket from "../models/EstadoTicket";

class EstadoTicketController {
  // Obtener todos los estados
  static async getAll(req: Request, res: Response) {
    try {
      const estados = await EstadoTicket.findAll({
        order: [["id", "ASC"]],
      });

      return res.json(estados);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al obtener los estados",
      });
    }
  }

  // Obtener estado por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const estado = await EstadoTicket.findByPk(id);

      if (!estado) {
        return res.status(404).json({ message: "Estado no encontrado" });
      }

      return res.json(estado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al obtener el estado",
      });
    }
  }

  // Crear estado
  static async create(req: Request, res: Response) {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      const estado = await EstadoTicket.create({ nombre });

      return res.status(201).json({
        message: "Estado creado correctamente",
        id: estado.id,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: "Error al crear estado",
        error: error.message,
      });
    }
  }

  // Actualizar estado
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre } = req.body;

      const estado = await EstadoTicket.findByPk(id);

      if (!estado) {
        return res.status(404).json({ message: "Estado no encontrado" });
      }

      estado.nombre = nombre ?? estado.nombre;

      await estado.save();

      return res.json({ message: "Estado actualizado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al actualizar el estado",
      });
    }
  }

  // Eliminar estado
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const estado = await EstadoTicket.findByPk(id);

      if (!estado) {
        return res.status(404).json({ message: "Estado no encontrado" });
      }

      await estado.destroy();

      return res.json({ message: "Estado eliminado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al eliminar el estado",
      });
    }
  }
}

export default EstadoTicketController;
