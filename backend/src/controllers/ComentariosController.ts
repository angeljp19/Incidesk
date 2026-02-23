import { Request, Response } from "express";
import Comentario from "../models/Comentarios";
import Ticket from "../models/Tickets";
import Usuario from "../models/Usuario";

class ComentariosController {
  // Obtener todos los comentarios
  static async getAll(req: Request, res: Response) {
    try {
      const comentarios = await Comentario.findAll({
        include: [{ model: Ticket }, { model: Usuario }],
        order: [["id", "ASC"]],
      });

      return res.json(comentarios);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al obtener los comentarios" });
    }
  }

  // Obtener comentario por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const comentario = await Comentario.findByPk(id, {
        include: [{ model: Ticket }, { model: Usuario }],
      });

      if (!comentario) {
        return res.status(404).json({ message: "Comentario no encontrado" });
      }

      return res.json(comentario);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al obtener el comentario" });
    }
  }

  // Obtener comentarios por ticket_id
  static async getCommentsByTicketId(req: Request, res: Response) {
    try {
      const { id } = req.params; // id es ticket_id

      const comentarios = await Comentario.findAll({
        where: { ticket_id: id },
        include: [{ model: Ticket }, { model: Usuario }],
        order: [["fecha", "ASC"]],
      });

      return res.json(comentarios);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al obtener los comentarios del ticket" });
    }
  }

  // Crear comentario
  static async create(req: Request, res: Response) {
    try {
      const { ticket_id, usuario_id, contenido, es_nota_interna } = req.body;

      if (!usuario_id || !contenido) {
        return res.status(400).json({
          message: "usuario_id y contenido son obligatorios",
        });
      }

      const comentario = await Comentario.create({
        ticket_id,
        usuario_id,
        contenido,
        es_nota_interna: es_nota_interna || false,
      });

      return res.status(201).json({
        message: "Comentario creado correctamente",
        id: comentario.id,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: "Error al crear comentario",
        error: error.message,
      });
    }
  }

  // Actualizar comentario
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { contenido, es_nota_interna } = req.body;

      const comentario = await Comentario.findByPk(id);

      if (!comentario) {
        return res.status(404).json({ message: "Comentario no encontrado" });
      }

      comentario.contenido = contenido ?? comentario.contenido;
      comentario.es_nota_interna =
        es_nota_interna ?? comentario.es_nota_interna;

      await comentario.save();

      return res.json({ message: "Comentario actualizado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al actualizar el comentario",
      });
    }
  }

  // Eliminar comentario
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const comentario = await Comentario.findByPk(id);

      if (!comentario) {
        return res.status(404).json({ message: "Comentario no encontrado" });
      }

      await comentario.destroy();

      return res.json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al eliminar el comentario",
      });
    }
  }
}

export default ComentariosController;
