import { Router } from "express";
import { verifyTokenJWTadmin } from "../middlewares/jwt.middleware.admin.js";
import { AdminController } from "../controllers/admin.controller.js";

const router = Router()

router.post('/login', AdminController.login)
router.post('/register', AdminController.register)

export default router;