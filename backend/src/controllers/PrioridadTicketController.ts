import { Request, Response } from "express";
import PrioridadTicket from "../models/PrioridadesTickets";

class PrioridadTicketController {
  // Obtener todas las prioridades
  static async getAll(req: Request, res: Response) {
    try {
      const prioridades = await PrioridadTicket.findAll({where: {"activo": true}, order:[["id", "ASC"]]});

      return res.json(prioridades);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al obtener las prioridades",
      });
    }
  }

  // Obtener prioridad por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prioridad = await PrioridadTicket.findByPk(id);

      if (!prioridad) {
        return res.status(404).json({ message: "Prioridad no encontrada" });
      }

      return res.json(prioridad);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al obtener la prioridad",
      });
    }
  }

  // Crear prioridad
  static async create(req: Request, res: Response) {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      const prioridad = await PrioridadTicket.create({ nombre });

      return res.status(201).json({
        message: "Prioridad creada correctamente",
        id: prioridad.id,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: "Error al crear prioridad",
        error: error.message,
      });
    }
  }

  // Actualizar prioridad
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, activo } = req.body;

      const prioridad = await PrioridadTicket.findByPk(id);

      if (!prioridad) {
        return res.status(404).json({ message: "Prioridad no encontrada" });
      }

      prioridad.nombre = nombre ?? prioridad.nombre;
      prioridad.activo = activo ?? prioridad.activo;

      await prioridad.save();

      return res.json({ message: "Prioridad actualizada correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al actualizar la prioridad",
      });
    }
  }

  // Eliminar prioridad
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prioridad = await PrioridadTicket.findByPk(id);

      if (!prioridad) {
        return res.status(404).json({ message: "Prioridad no encontrada" });
      }

      await prioridad.destroy();

      return res.json({ message: "Prioridad eliminada correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al eliminar la prioridad",
      });
    }
  }
}

export default PrioridadTicketController;
