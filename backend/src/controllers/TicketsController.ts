import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import Ticket from "../models/Tickets";
import ArchivoAdjunto from "../models/ArchivosAdjuntos";
import Usuario from "../models/Usuario";
import CategoriaTicket from "../models/CategoriaTicket";
import PrioridadTicket from "../models/PrioridadesTickets";
import EstadoTicket from "../models/EstadoTicket";
import Notificaciones from "../models/Notificaciones";
import Departamento from "../models/Departamento";

class TicketController {
  // Obtener todos los tickets (opcionalmente filtrados por solicitante)
  static async getAll(req: Request, res: Response) {
    try {
      const { solicitanteId } = req.query;

      const where: any = {};
      if (solicitanteId) where.solicitante_id = solicitanteId;

      const tickets = await Ticket.findAll({
        where,
        include: [
          {
            model: Usuario,
            as: "solicitante",
            attributes: ["id", "nombre", "apellido"],
          },
          {
            model: Usuario,
            as: "tecnicoAsignado",
            attributes: ["id", "nombre", "apellido"],
          },
          { model: CategoriaTicket, attributes: ["id", "nombre"] },
          { model: PrioridadTicket,  attributes: ["id", "nombre"] },
          { model: EstadoTicket, attributes: ["id", "nombre"] },
        ],
      });

      return res.json(tickets);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener los tickets" });
    }
  }
  static async getUrlArchivo(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const archivo = await ArchivoAdjunto.findOne({
        where: { ticket_id: id },
      });

      if (!archivo) {
        return res.status(404).json({ message: "Archivo no encontrado" });
      }

      // Normalizar ruta (Windows / Linux)
      const filePath = path.resolve(archivo.ruta_servidor);

      // Verificar que el archivo exista físicamente
      if (!fs.existsSync(filePath)) {
        return res
          .status(404)
          .json({ message: "Archivo no existe en el servidor" });
      }

      // Enviar el archivo
      res.setHeader("Content-Type", archivo.mime_type);
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${archivo.nombre_archivo}"`
      );

      return res.sendFile(filePath);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al obtener el archivo adjunto",
      });
    }
  }

  // Obtener ticket por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const ticket = await Ticket.findByPk(id, {
        include: [
          {
            model: Usuario,
            as: "solicitante",
            attributes: ["id", "nombre", "apellido"],
          },
          {
            model: Usuario,
            as: "tecnicoAsignado",
            attributes: ["id", "nombre", "apellido"],
          },
          { model: CategoriaTicket, attributes: ["id", "nombre"] },
          { model: PrioridadTicket, attributes: ["id", "nombre"] },
          { model: EstadoTicket, attributes: ["id", "nombre"] },
        ],
      });

      if (!ticket)
        return res.status(404).json({ message: "Ticket no encontrado" });

      return res.json(ticket);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener el ticket" });
    }
  }

  // Crear ticket
  static async create(req: Request, res: Response) {
    try {
      const {
        titulo,
        descripcion,
        solicitante_id,
        categoria_id,
        prioridad_id,
        tecnico_asignado_id,
      } = req.body;

      if (
        !titulo ||
        !descripcion ||
        !solicitante_id ||
        !categoria_id ||
        !prioridad_id
      ) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      const ticket = await Ticket.create({
        titulo,
        descripcion,
        solicitante_id,
        categoria_id,
        prioridad_id,
        tecnico_asignado_id: tecnico_asignado_id ?? null,
        estado_id: 3,
      });

      const userSolicitante = await Usuario.findByPk(solicitante_id, {
        include: { model: Departamento, attributes: ["nombre"] },
      });

      await Notificaciones.create({
        titulo: "Creacion de Ticket",
        tipo_id: 1,
        entidad_id: ticket.id,
        receptor_id: tecnico_asignado_id,
        hexColor: "#007916ff",
        info: `El usuario "${userSolicitante?.nombre} ${userSolicitante?.apellido}" del departamento de "${userSolicitante?.Departamento.nombre}"
        ha creado un ticket con el titulo "${titulo}"`,
      });

      if (req.file) {
        await ArchivoAdjunto.create({
          ticket_id: ticket.id,
          nombre_archivo: req.file.originalname,
          ruta_servidor: req.file.path,
          mime_type: req.file.mimetype,
        });
      }

      return res.status(201).json({
        message: "Ticket creado correctamente",
        id: ticket.id,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Error al crear ticket",
        error: error.message,
      });
    }
  }

  // Actualizar ticket
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const {
        titulo,
        descripcion,
        categoria_id,
        estado_id,
        prioridad_id,
        tecnico_asignado_id,
        solucion_final,
        fecha_cierre,
        calificacion
      } = req.body;

      const ticket = await Ticket.findByPk(id);

      if (!ticket) {
        return res.status(404).json({ message: "Ticket no encontrado" });
      }
      const estadoAntiguo = ticket.estado_id
      const antesAsignado = ticket.tecnico_asignado_id;

      // Datos auxiliares para las notificaciones
      const solicitante = await Usuario.findByPk(ticket.solicitante_id, {
        include: { model: Departamento, attributes: ["nombre"] },
      });

      const nuevoTecnico = tecnico_asignado_id
        ? await Usuario.findByPk(tecnico_asignado_id)
        : null;

      const tecnicoAnterior = antesAsignado
        ? await Usuario.findByPk(antesAsignado)
        : null;

      // Actualización de campos
      ticket.titulo = titulo ?? ticket.titulo;
      ticket.descripcion = descripcion ?? ticket.descripcion;
      ticket.categoria_id = categoria_id ?? ticket.categoria_id;
      ticket.estado_id = estado_id ?? ticket.estado_id;
      ticket.prioridad_id = prioridad_id ?? ticket.prioridad_id;
      ticket.tecnico_asignado_id =
        tecnico_asignado_id ?? ticket.tecnico_asignado_id;
      ticket.solucion_final = solucion_final ?? ticket.solucion_final;
      ticket.calificacion = calificacion ?? ticket.calificacion;
      ticket.fecha_cierre = fecha_cierre ?? ticket.fecha_cierre;
      ticket.fecha_ultima_actualizacion = new Date();

      /**
       * ASIGNACIÓN INICIAL
       */
      if (!antesAsignado && ticket.tecnico_asignado_id) {
        await Notificaciones.create({
          titulo: "Asignación de Ticket",
          tipo_id: 2,
          entidad_id: ticket.id,
          receptor_id: ticket.tecnico_asignado_id,
          hexColor: "#002079ff",
          info: `Asignado el ticket #${ticket.id} "${ticket.titulo}", 
creado por ${solicitante?.nombre} ${solicitante?.apellido} 
del departamento "${solicitante?.Departamento.nombre}".`,
        });
      }

      /**
       * REASIGNACIÓN
       */
      if (
        antesAsignado &&
        tecnico_asignado_id &&
        antesAsignado !== tecnico_asignado_id
      ) {
        // Desactivamos notificaciones previas de asignación
        await Notificaciones.update(
          { activo: false },
          { where: { tipo_id: 2, entidad_id: ticket.id } }
        );

        await Notificaciones.create({
          titulo: "Reasignación de Ticket",
          tipo_id: 2,
          entidad_id: ticket.id,
          receptor_id: tecnico_asignado_id,
          hexColor: "#002079ff",
          info: `El ticket #${ticket.id} "${ticket.titulo}" fue reasignado.
Anteriormente asignado a ${tecnicoAnterior?.nombre} ${tecnicoAnterior?.apellido}.
Ahora está bajo tu responsabilidad.`,
        });
      }

      // CAMBIO DE ESTADO 
      if (estado_id && estado_id !== estadoAntiguo) {
        await Notificaciones.create({
          titulo: "Actualización de estado",
          tipo_id: 3,
          entidad_id: ticket.id,
          receptor_id: ticket.solicitante_id,
          hexColor: "#6b21a8",
          info: `El estado del ticket #${ticket.id} "${ticket.titulo}" fue actualizado.
Nuevo estado asignado.`,
        });
      }

      await ticket.save();

      return res.json({ message: "Ticket actualizado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar ticket" });
    }
  }

  // Eliminar ticket
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const ticket = await Ticket.findByPk(id);
      if (!ticket)
        return res.status(404).json({ message: "Ticket no encontrado" });

      await ticket.destroy();

      return res.json({ message: "Ticket eliminado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar ticket" });
    }
  }
}

export default TicketController;
