import express from "express"
import multer from "multer"
import bcrypt from "bcrypt"

const app = express()

app.use(express.json())


const filearray = [];

const storage = multer.memoryStorage()

const upload = multer({storage})

app.post("/",upload.single("file"), async (req,res)=>{

    filearray.push(req.file);

    const file = req.file
    const data = req.body
    

    if(!file){
        return res.status(400).json({
            message:"please select the file"
        })
    }

    res.status(200).json({
        message:"File is upload Successfully",
        file,
        data:data
    })


})

app.get("/file/:index",(req,res)=>{

    const file  = filearray[req.params.index]

    if(!file){
        return res.status(404).json({
            message:"File is not found "
        })
    }

    res.set("Content-type",file.mimetype);
    res.send(file.buffer)
})



app.listen(3000,()=>{
    console.log("Server is created to Successfully")
})

