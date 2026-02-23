import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import { requireRole } from "../middleware/rolesMiddleware";
import { requireAuth } from "../middleware/authMiddleware";
import { validateSchema } from "../middleware/validateSchema";
import { createUsuarioSchema, updateUsuarioSchema } from "../schemas/usuario.schema";

const router = Router();

router.get("/", requireAuth, requireRole(3, 1),UsuarioController.getAll);
router.get("/:id",  requireAuth, requireRole(3, 1),UsuarioController.getById);
router.post("/", requireAuth, requireRole(3), validateSchema(createUsuarioSchema),UsuarioController.create);
router.put("/:id", requireAuth, requireRole(3), validateSchema(updateUsuarioSchema),UsuarioController.update);
router.delete("/:id", requireAuth, requireRole(3),UsuarioController.delete);

export default router;
