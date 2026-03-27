import dotenv from "dotenv"
import app from "./src/app.js"
import connectDB from "./src/config/db.js"


dotenv.config()
 const port = process.env.PORT
connectDB()

console.log(port)


app.listen(port || 3000,()=>{

    console.log("Server is connect to Successfully")

})
