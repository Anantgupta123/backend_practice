import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js";
import transactionController from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/transaction",authMiddleware.authMiddleware,transactionController.transactionController)

router.post("/balance",authMiddleware.authMiddleware,transactionController.getTransactions)





export default router