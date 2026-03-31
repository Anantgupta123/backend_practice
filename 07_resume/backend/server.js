require("dotenv").config()
const app = require("./src/app.js")
const connectDB = require("./src/db/db.js")
const {resume, selfDescription,jobDescription} = require("./src/services/temp.js")
const {generateInterviewReport} = require("./src/services/ai.service.js")


connectDB()
generateInterviewReport({resume,selfDescription,jobDescription})


app.listen(3000,()=>{

    console.log("Server is runnig on port 3000")

})