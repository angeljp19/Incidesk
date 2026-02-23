import { Router } from "express";
import TicketController from "../controllers/TicketsController";
import { upload } from "../middleware/upload";
import { requireRole } from "../middleware/rolesMiddleware";
import { requireAuth } from "../middleware/authMiddleware";
import { validateSchema } from "../middleware/validateSchema";
import { createTicketSchema, updateTicketSchema } from "../schemas/tickets.schema";


const router = Router();

router.get("/", requireAuth, requireRole(1,2,3),TicketController.getAll);
router.get("/:id", requireAuth, requireRole(1, 2, 3),TicketController.getById);
router.get("/archivo/:id",TicketController.getUrlArchivo);
router.post("/", upload.single("archivo"), requireAuth, requireRole(2), validateSchema(createTicketSchema),TicketController.create);
router.put("/:id", requireAuth, requireRole(1, 2, 3), validateSchema(updateTicketSchema),TicketController.update);
router.delete("/:id", requireAuth, requireRole(3),TicketController.delete);

export default router;
