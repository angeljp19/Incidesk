import { Router } from "express";
import DepartamentoController from "../controllers/DepartamentoController";

const router = Router();

router.get("/", DepartamentoController.getAll);
router.get("/:id", DepartamentoController.getById);
router.post("/", DepartamentoController.create);
router.put("/:id", DepartamentoController.update);
router.delete("/:id", DepartamentoController.delete);

export default router;
