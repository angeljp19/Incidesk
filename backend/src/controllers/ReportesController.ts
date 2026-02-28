import { Request, Response } from "express";
import { Op } from "sequelize";
import PDFDocument from "pdfkit";
import Ticket from "../models/Tickets";
import Departamento from "../models/Departamento";
import CategoriaTicket from "../models/CategoriaTicket";
import PrioridadTicket from "../models/PrioridadesTickets";
import EstadoTicket from "../models/EstadoTicket";
import Usuario from "../models/Usuario";
import { Sequelize } from "sequelize";

export async function generarReporte(req: Request, res: Response) {
  try {
    const { filtros } = req.body;

    const {
      departamento_id,
      solicitante_id,
      tecnico_asignado_id,
      categoria_id,
      prioridad_id,
      estado_id,
      fecha_creacion,
      calificacion
    } = filtros || {};

    /* ==========================
       WHERE dinámico (limpio)
       ========================== */
    const whereTicket: any = {};
    const whereSolicitante: any = {};

    // filtros directos del ticket
    const filtrosTicket = {
      solicitante_id,
      tecnico_asignado_id,
      categoria_id,
      prioridad_id,
      estado_id,
      calificacion
    };

    Object.entries(filtrosTicket).forEach(([key, value]) => {
      if (value) whereTicket[key] = value;
    });

    // filtro por departamento (NO es de Ticket)
    if (departamento_id) {
      whereSolicitante.departamento_id = departamento_id;
    }

    /* ==========================
       Filtro por fecha
       ========================== */
    if (fecha_creacion?.desde || fecha_creacion?.hasta) {
      const rango: any = {};

      if (fecha_creacion.desde) {
        rango[Op.gte] = new Date(fecha_creacion.desde);
      }

      if (fecha_creacion.hasta) {
        const hasta = new Date(fecha_creacion.hasta);
        hasta.setHours(23, 59, 59, 999);
        rango[Op.lte] = hasta;
      }

      whereTicket.fecha_creacion = rango;
    }

    /* ==========================
       Consulta
       ========================== */

    const tickets = await Ticket.findAll({
      where: whereTicket,
      order: [["fecha_creacion", "DESC"]],
      include: [
        {
          model: Usuario,
          as: "solicitante",
          where: whereSolicitante,
          include: [{ model: Departamento, as: "Departamento" }],
        },
        {
          model: Usuario,
          as: "tecnicoAsignado",
        },
        { model: CategoriaTicket },
        { model: PrioridadTicket },
        { model: EstadoTicket },
      ],
    });

    /* ==========================
       Generación del PDF
       ========================== */
    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=reporte_tickets.pdf`,
    );

    doc.pipe(res);

    /* ==========================
       Header
       ========================== */
    /* ==========================
   Header con logo y empresa
   ========================== */

    // Logo
    doc.image("src/3nlogo.png", 40, 40, {
      width: 50,
    });

    // Nombre de la empresa
    doc.fontSize(16).fillColor("#111827").text("VELAS 3N C.A.", 100, 45);

    // Subtítulo
    doc
      .fontSize(12)
      .fillColor("gray")
      .text("Reporte de Tickets - Sistema gestion TI", 100, 65);

    // Fecha
    doc
      .fontSize(9)
      .fillColor("gray")
      .text(`Fecha de generación: ${new Date().toLocaleString()}`, 100, 82);

    // Línea separadora
    doc.moveTo(40, 105).lineTo(555, 105).strokeColor("#e5e7eb").stroke();

    // Espacio después del header
    doc.moveDown(4);
    doc.fillColor("black");

    /* ==========================
       Resumen
       ========================== */
    doc.fontSize(12).text(`Total de tickets: ${tickets.length}`);
    doc.moveDown(1);

    /* ==========================
       Listado de tickets
       ========================== */
    tickets.forEach((ticket, index) => {
      doc
        .fontSize(11)
        .fillColor("#1f2937")
        .text(`Ticket #${ticket.id} - ${ticket.titulo}`, {
          underline: true,
        });

      doc.moveDown(0.3);

      doc
        .fontSize(10)
        .fillColor("black")
        .text(
          `Solicitante: ${ticket.solicitante?.nombre} ${
            ticket.solicitante?.apellido
          }
Departamento: ${ticket.solicitante?.Departamento?.nombre}
Categoría: ${ticket.CategoriaTicket?.nombre}
Prioridad: ${ticket.PrioridadTicket?.nombre}
Estado: ${ticket.EstadoTicket?.nombre}
Técnico: ${
            ticket.tecnicoAsignado
              ? `${ticket.tecnicoAsignado.nombre} ${ticket.tecnicoAsignado.apellido}`
              : "No asignado"
          }
Fecha: ${ticket.fecha_creacion.toLocaleDateString()}
Calificación: ${ticket.calificacion ?? "Sin calificar"}
`,

        );

      doc.moveDown(1);

      if (index !== tickets.length - 1) {
        doc
          .moveTo(40, doc.y)
          .lineTo(555, doc.y)
          .strokeColor("#e5e7eb")
          .stroke();

        doc.moveDown(1);
      }
    });

    doc.end();
  } catch (error) {
    console.error("Error generando reporte:", error);
    return res.status(500).json({
      message: "Error al generar el reporte",
    });
  }
}
