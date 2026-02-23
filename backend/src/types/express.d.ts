import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      email: string;
      nombre: string;
      apellido: string;
      rol_id: number;
      departamento_id: number;
    };
  }
}
