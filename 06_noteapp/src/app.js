import express from "express"
import authRoute from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(cookieParser())

// This is api's created by Anant gupta the boss
app.use("/api/auth",authRoute)
app.use("/api/note",noteRouter)






export default app