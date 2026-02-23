import { Router } from "express";
import NotificacionesController from "../controllers/notificacionesController";

const router = Router();

router.get("/", NotificacionesController.getAll);

export default router;
