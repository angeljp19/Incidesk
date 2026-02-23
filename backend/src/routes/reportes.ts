import { Router } from "express";
import { generarReporte } from "../controllers/ReportesController";
import { requireRole } from "../middleware/rolesMiddleware";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.post("/", requireAuth, requireRole(3),generarReporte);

export default router;
