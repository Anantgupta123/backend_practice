const express = require("express");
const authController = require("../controllers/auth.controller.js")
const authMiddlewre = require("../middlewares/auth.middleware.js")




const router = express.Router();


//use /api/auth/register
router.post("/register",authController.userRegister)

//use /api/auth/login
router.post("/login",authController.userLogin)

//use /api/auth/logout
router.post("/logout",authController.userLogout)


router.get("/get-me",authMiddlewre.authUser,authController.getCurrentUser)

module.exports = router;