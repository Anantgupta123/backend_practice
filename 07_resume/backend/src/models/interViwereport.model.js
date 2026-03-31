const mongoose = require("mongoose");


const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        require:[true,"TechnicalQuestion is required"]
    },
    intension:{
        type:String,
        require:[true,"Intension is required"]
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
        require:[true,"TechnicalQuestion is required"]
    },
    intension:{
        type:String,
        require:[true,"Intension is required"]
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
        type:PerformanceServerTiming,
        required:[true,"Focus is required"]
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

    behaviralQuestions:[behaviralQuestionSchema],

    skillGaps:[skillGapSchema],

    preprationPlanes:[preprationPlaneSchema]

},{
    timestamps:true
})


const interViwereportModel = mongoose.model("Report",interViwereportSchema);


module.exports = interViwereportModel