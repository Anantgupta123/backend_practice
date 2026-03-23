import dotenv from "dotenv"
import app from "./src/app.js"
import connectdb from "./src/db/db.js"


dotenv.config()
connectdb()

const port = process.env.PORT


app.listen(port || 3000,()=>{
console.log("Server is connected on port 3000")
})