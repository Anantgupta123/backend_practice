require("dotenv").config()
const app = require("./src/app.js")
const connectDB = require("./src/db/db.js")


connectDB()
const port  = process.env.PORT


app.listen(3000,()=>{

    console.log("Server is runnig on port 3000")

})