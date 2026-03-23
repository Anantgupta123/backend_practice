import express from "express"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("This is website ")
})

app.use("/api/auth",authRoute)


export default  app 