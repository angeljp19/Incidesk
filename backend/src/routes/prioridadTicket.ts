import { Router } from "express";
import PrioridadTicketController from "../controllers/PrioridadTicketController";

const router = Router();

router.get("/", PrioridadTicketController.getAll);
router.get("/:id", PrioridadTicketController.getById);
router.post("/", PrioridadTicketController.create);
router.put("/:id", PrioridadTicketController.update);
router.delete("/:id", PrioridadTicketController.delete);

export default router;
