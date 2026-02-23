import Joi from "joi";

/**
 * Crear ticket
 */
export const createTicketSchema = Joi.object({
  titulo: Joi.string().min(5).max(200).required(),
  descripcion: Joi.string().min(10).required(),

  solicitante_id: Joi.number().integer().positive().required(),
  categoria_id: Joi.number().integer().positive().required(),
  prioridad_id: Joi.number().integer().positive().required(),

  tecnico_asignado_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(null),
});

export const updateTicketSchema = Joi.object({
  titulo: Joi.string().min(5).max(200).optional(),
  descripcion: Joi.string().min(10).optional(),

  categoria_id: Joi.number().integer().positive().optional(),
  estado_id: Joi.number().integer().positive().optional(),
  prioridad_id: Joi.number().integer().positive().optional(),

  fecha_cierre: Joi.date().optional().allow(null),

  tecnico_asignado_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(null),

  solucion_final: Joi.string().allow(null).optional(),
  calificacion: Joi.string().allow(null).optional(),
});

