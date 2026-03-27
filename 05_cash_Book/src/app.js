import express from "express"
import authRouter from "./routes/auth.route.js"
import transactionRouter from "./routes/transaction.route.js"
import cookieParser from "cookie-parser"


const app = express()

app.use(express.json())
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send("This is anant gupta ")
})

//working on /api/auth/register
app.use("/api/auth",authRouter)
app.use("/api",transactionRouter)











export default app;