import { Router } from "express";
import ConversationService from "../services/conversation";
import { requireRole } from "../middleware/rolesMiddleware";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.post("/", requireAuth, requireRole(3, 1),ConversationService.conversationInit);
router.get("/:id", requireAuth, requireRole(3, 1), ConversationService.getConversationMessages);
router.get("/routes/:userId", requireAuth, requireRole(3, 1), ConversationService.getUserConversations);


export default router;
