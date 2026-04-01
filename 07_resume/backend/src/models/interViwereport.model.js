const mongoose = require("mongoose");


const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        require:[true,"TechnicalQuestion is required"]
    },
    intention:{
        type:String,
        require:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
})


const behaviralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"TechnicalQuestion is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]
    }
},{
    _id:false
})

const preprationPlaneSchema= new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    task:{
        type:String,
        required:[true,"Task is required"]

    }
},{
    _id:false
})



const interViwereportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Description is required"]
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionSchema],

    behavioralQuestions:[behaviralQuestionSchema],

    skillGaps:[skillGapSchema],

    preprationPlane:[preprationPlaneSchema],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
})


const interViwereportModel = mongoose.model("Report",interViwereportSchema);


module.exports = interViwereportModel