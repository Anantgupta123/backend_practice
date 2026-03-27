import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    amount:{
        type:Number,
        required:[true,"Amount is requir"],    
    },
    type:{
        type:String,
        enum:["CREDIT","DEBIT"],
        default:"CREDIT",
        require:true
    },
    note:{
        type:String,
        required:true
    }

})

const transactionModel = mongoose.model("Transaction",transactionSchema);

export default transactionModel