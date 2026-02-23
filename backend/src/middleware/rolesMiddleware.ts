import { Request, Response, NextFunction } from "express";

/**
 * Autoriza por rol_id. Ej: requireRole(3) para Admin,
 * o requireRole(3,1) para Admin + Tecnico.
 */
export const requireRole = (...allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }
    if (!allowedRoles.includes(req.user.rol_id)) {
      return res.status(403).json({ message: "Prohibido: rol insuficiente" });
    }
    next();
  };
};
