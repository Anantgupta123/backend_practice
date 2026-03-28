import express from "express";
import noteController from "../controllers/note.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import authController from "../controllers/auth.controller.js";

const router  = express.Router()



router.post("/create",authMiddleware.authMiddleware,noteController.createNote)


// Get all note 
router.get("/",authMiddleware.authMiddleware,noteController.getAllnote)


//Get note by id only specefic
router.get("/:id",authMiddleware.authMiddleware,noteController.getNoteById)


// Update note by id
router.patch("/:id",authMiddleware.authMiddleware,noteController.updateNote)


// Delete note by id
router.delete("/:id",authMiddleware.authMiddleware,noteController.deleteNote)




export default router;