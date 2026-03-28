import express from "express";
import authController from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/register",authController.userRgister)


router.post("/login",authController.userLogin)

router.post("/logout",authController.userLogout)





export default router