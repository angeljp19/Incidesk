import { Router } from "express";
import CategoriaTicketController from "../controllers/CategoriaTicketController";
import { requireRole } from "../middleware/rolesMiddleware";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/", requireAuth, requireRole(1,2,3),CategoriaTicketController.getAll);
router.get("/:id", requireAuth, requireRole(1,2,3),CategoriaTicketController.getById);
router.post("/", requireAuth, requireRole(3),CategoriaTicketController.create);
router.put("/:id", requireAuth, requireRole(3), CategoriaTicketController.update);
router.delete("/:id", requireAuth, requireRole(3),CategoriaTicketController.delete);

export default router;
