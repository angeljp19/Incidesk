import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateSchema = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,  
      stripUnknown: true, 
    });

    if (error) {
        console.log("nao nao")
      return res.status(400).json({
        message: "Datos inválidos",
        errors: error.details.map(detail => detail.message),
      });
    }
    req.body = value;
    next();
  };
};
