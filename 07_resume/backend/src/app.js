const express = require("express");
const authRouter = require("./routes/auth.route.js")
const Cookieparser = require("cookie-parser")
const cors = require("cors")

// use all packeges
const app = express();

// All authantication part here
app.use(express.json());
app.use(Cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.use("/api/auth",authRouter)










module.exports  = app;