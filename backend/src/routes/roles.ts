import { Router } from "express";
import RolController from "../controllers/RolController";

const router = Router();

router.get("/", RolController.getAll);
router.get("/:id", RolController.getById);
router.post("/", RolController.create);
router.put("/:id", RolController.update);
router.delete("/:id", RolController.delete);

export default router;
