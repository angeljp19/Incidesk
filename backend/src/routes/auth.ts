import { Router } from "express";
import { login, recuperarContraseña, validarCodigo } from "../controllers/AuthController";
import { recuperarContrasenaSchema } from "../schemas/recuperarContrasena";
import { validateSchema } from "../middleware/validateSchema";

const router = Router();

// POST /auth/login
router.post("/login", login);

router.post("/recuperarContrasena", recuperarContraseña)
router.post("/validarCodigo", validateSchema(recuperarContrasenaSchema),validarCodigo)

export default router;
