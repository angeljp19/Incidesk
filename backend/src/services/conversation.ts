import Conversacion from "../models/Conversacion";
import ConversacionParticipante from "../models/ConversacionParticipante";
import Mensaje from "../models/Mensaje";
import Usuario from "../models/Usuario";
import Sequelize from "sequelize";
import { Request, Response } from "express";
import { sequelize } from "../models/database";
import { Op, fn, col, literal } from "sequelize";

class ConversationService {
  static async conversationInit(req: Request, res: Response) {
    const transaction = await sequelize.transaction();

    try {
      const { fromId, toId } = req.body;

      if (!fromId || !toId || fromId === toId) {
        await transaction.rollback();
        return res.status(400).json({
          message: "Usuarios inválidos para iniciar conversación",
        });
      }

      // Buscar conversaciones privadas donde estén ambos usuarios
      const conversaciones = await Conversacion.findAll({
        where: { tipo: "privada" },
        include: [
          {
            model: ConversacionParticipante,
            as: "participantes",
            where: {
              usuario_id: {
                [Op.in]: [fromId, toId],
              },
            },
            attributes: ["usuario_id"],
            required: true,
          },
        ],
        transaction,
      });

      // Verificar si alguna tiene exactamente 2 participantes
      const existingConversation = conversaciones.find(
        (conv) => conv.participantes?.length === 2
      );

      if (existingConversation) {
        await transaction.commit();
        return res.json({
          conversacionId: existingConversation.id,
          creada: false,
        });
      }

      // Crear nueva conversación
      const nuevaConversacion = await Conversacion.create(
        { tipo: "privada" },
        { transaction }
      );

      await ConversacionParticipante.bulkCreate(
        [
          { conversacion_id: nuevaConversacion.id, usuario_id: fromId },
          { conversacion_id: nuevaConversacion.id, usuario_id: toId },
        ],
        { transaction }
      );

      await transaction.commit();

      return res.status(201).json({
        conversacionId: nuevaConversacion.id,
        creada: true,
      });
    } catch (error) {
      await transaction.rollback();
      console.error(error);

      return res.status(500).json({
        message: "Error al iniciar la conversación",
      });
    }
  }

  static async saveMessage(
    conversacion_id: number,
    usuario_id: number,
    contenido: string
  ) {
    try {
      await Mensaje.create({
        conversacion_id,
        usuario_id,
        contenido,
      });
    } catch (error) {
      console.error(error);
    }
  }
  static async getConversationMessages(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const mensajes = await Mensaje.findAll({
        where: { conversacion_id: id },
        include: [
          {
            model: Usuario,
          },
        ],
        order: [["created_at", "ASC"]],
      });
      return res.json(mensajes);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async getUserConversations(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          message: "userId requerido",
        });
      }

      const conversaciones = await Conversacion.findAll({
        include: [
          /* Participantes */
          {
            model: ConversacionParticipante,
            as: "participantes",
            attributes: ["usuario_id"],
            include: [
              {
                model: Usuario,
                attributes: ["id", "nombre", "apellido"],
              },
            ],
          },

          /* Último mensaje */
          {
            model: Mensaje,
            as: "mensajes",
            attributes: ["id", "contenido", "created_at", "usuario_id"],
            separate: true,
            limit: 1,
            order: [["created_at", "DESC"]],
            include: [
              {
                model: Usuario,
                attributes: ["id", "nombre", "apellido"],
              },
            ],
          },
        ],

        where: {
          id: {
            [Op.in]: sequelize.literal(`(
              SELECT conversacion_id
              FROM conversacion_participantes
              WHERE usuario_id = ${userId}
            )`),
          },
        },

        order: [
          [
            literal(`(
              SELECT MAX(created_at)
              FROM mensajes
              WHERE mensajes.conversacion_id = "Conversacion"."id"
            )`),
            "DESC",
          ],
        ],
      });

      return res.json(conversaciones);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al obtener conversaciones",
      });
    }
  }
}

export default ConversationService;
