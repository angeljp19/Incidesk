import { Router } from "express";
import EstadoTicketController from "../controllers/EstadoTicketController";

const router = Router();

router.get("/", EstadoTicketController.getAll);
router.get("/:id", EstadoTicketController.getById);
router.post("/", EstadoTicketController.create);
router.put("/:id", EstadoTicketController.update);
router.delete("/:id", EstadoTicketController.delete);

export default router;
