import express from "express";
import authController from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/register",authController.userRegister)

router.post("/loging",authController.userLogin)

router.post("/logout",authController.userLogout)




export default router;