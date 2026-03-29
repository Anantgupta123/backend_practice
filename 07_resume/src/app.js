const express = require("express");
const authRouter = require("./routes/auth.route.js")
const Cookieparser = require("cookie-parser")

// use all packeges
const app = express();

// All authantication part here
app.use(express.json());
app.use(Cookieparser())



app.use("/api/auth",authRouter)










module.exports  = app;