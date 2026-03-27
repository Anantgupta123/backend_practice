import dotenv from "dotenv"
import app from "./src/app.js"
import conntectDB from "./src/db/db.js"

dotenv.config()
conntectDB()



app.listen(3000,()=>{
    console.log("Server is created successfully")
})