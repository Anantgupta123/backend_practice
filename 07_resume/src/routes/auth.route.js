const express = require("express");
const authController = require("../controllers/auth.controller.js")

const router = express.Router();


//use /api/auth/register
router.post("/register",authController.userRegister)

//use /api/auth/login
router.post("/login",authController.userLogin)

//use /api/auth/logout
router.post("/logout",authController.userLogout)




module.exports = router;