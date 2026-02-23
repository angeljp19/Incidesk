import { Router } from "express";
import ComentariosController from "../controllers/ComentariosController";
import { requireRole } from "../middleware/rolesMiddleware";
import { requireAuth } from "../middleware/authMiddleware";


const router = Router();

router.get("/", requireAuth, requireRole(1, 2, 3),ComentariosController.getAll);
router.get("/:id", requireAuth, requireRole(1,2,3),ComentariosController.getCommentsByTicketId);
router.post("/", requireAuth, requireRole(1, 2),ComentariosController.create);
router.put("/:id", requireAuth, requireRole(1, 2),ComentariosController.update);
router.delete("/:id", requireAuth, requireRole(1, 2),ComentariosController.delete);

export default router;
