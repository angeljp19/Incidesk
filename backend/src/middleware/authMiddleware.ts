import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // Prioridad: Authorization Bearer. Alternativa: cookie "token".
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  const token = tokenFromHeader || (req as any).cookies?.token;


  if (!token) {
    return res.status(401).json({ message: "No autorizado: token faltante" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
      nombre: string;
      apellido: string;
      rol_id: number;
      departamento_id: number;
      iat: number;
      exp: number;
    };

    req.user = {
      id: decoded.id,
      email: decoded.email,
      nombre: decoded.nombre,
      apellido: decoded.apellido,
      rol_id: decoded.rol_id,
      departamento_id: decoded.departamento_id,
    };


    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
