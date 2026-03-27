import transactionModel from "../models/transaction.model.js";

async function transactionController(req,res){

    const {amount,type,note} = req.body;

    if(!amount || !type || !note){
        return res.status(402).json({
            message:"Please fill app data"
        })
    }

    const transaction = transactionModel.create({
        amount,
        type,
        note,
        userId:req.user._id
    })

    res.status(200).json({
        transaction:{
            // amount:(await transaction).amount,
            // type:(await transaction).type,
            // note:(await transaction).note
        }
    })
}

const getTransactions = async (req, res) => {
    const transactions = await transactionModel.find({
        userId: req.userId
    }).sort({ createdAt: -1 })

    res.json(transactions)
}


export default {transactionController,getTransactions}