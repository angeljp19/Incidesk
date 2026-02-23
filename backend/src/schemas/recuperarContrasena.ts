import Joi from "joi";

export const recuperarContrasenaSchema = Joi.object({
  codigo: Joi.string().required(),

  email: Joi.string().email().max(150).required().messages({
    "string.email": "El email no es válido",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
});
