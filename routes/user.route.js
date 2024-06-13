import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyTokenJWT } from "../middlewares/jwt.middleware.js";
import {verifyTokenJWTadmin} from "../middlewares/jwt.middleware.admin.js"

const router =  Router()

router.get('/', UserController.getUsers)
router.get('/user/:email', UserController.getUser)
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.put('/user/update', verifyTokenJWT, UserController.updateDatos)
router.delete('/user/delete', verifyTokenJWT, UserController.deleteAccount)
router.put('/user/state', verifyTokenJWTadmin, UserController.changeEstado)


export default router;  