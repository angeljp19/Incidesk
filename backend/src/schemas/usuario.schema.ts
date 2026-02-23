import Joi from "joi";

export const createUsuarioSchema = Joi.object({
  nombre: Joi.string()
    .max(100)
    .required()
    .messages({
      "string.empty": "El nombre es obligatorio",
    }),

  apellido: Joi.string()
    .max(100)
    .required()
    .messages({
      "string.empty": "El apellido es obligatorio",
    }),

  email: Joi.string()
    .email()
    .max(150)
    .required()
    .messages({
      "string.email": "El email no es válido",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "La contraseña debe tener al menos 6 caracteres",
    }),

  departamento_id: Joi.number()
    .integer()
    .positive()
    .required(),

  rol_id: Joi.number()
    .integer()
    .positive()
    .required(),
});


export const updateUsuarioSchema = Joi.object({
  nombre: Joi.string().max(100).optional(),
  apellido: Joi.string().max(100).optional(),
  email: Joi.string().email().max(150).optional(),
  password: Joi.string().min(6).optional(),
  departamento_id: Joi.number().integer().positive().optional(),
  rol_id: Joi.number().integer().positive().optional(),
  activo: Joi.boolean().optional(),
}).min(1); 
