const express = require("express");
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

const authRouter = require("./routes/auth.route.js")
const interviewRouter = require("./routes/interview.route.js");




app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)










module.exports  = app;