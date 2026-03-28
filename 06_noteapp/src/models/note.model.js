import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({

    title:{
        type:String,
        required:[true,"title is required brother"]
    },
    data:{
        type:String,
        required:[true,"Data is required brothers"]
    }
},{
    timestamps:true
})

const noteModel = mongoose.model("Notes",noteSchema)

export default noteModel;