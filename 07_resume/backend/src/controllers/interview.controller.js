const pdfParse = require("pdf-parse")
const {generateInterviewReport} = require("../services/ai.service.js")
const interViwereportModel = require("../models/interViwereport.model.js")

async function generateInterviewReportController(req,res){


     const resumeContent =await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText() 

    const {selfDescription, jobDescription}  = req.body

    if(!resumeContent || !selfDescription || !jobDescription){
         
        return res.status(400).json({
            message:"Some thing is missing interview controller"
        })
    }

    const interViewReportByAi = await generateInterviewReport({
        resume :resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interViwereportModel.create({
        user:req.user.id,
        resume:resume,
        selfDescription:selfDescription,
        jobDescription:jobDescription,
        matchScore:interViewReportByAi.matchScore,
        technicalQuestions:interViewReportByAi.technicalQuestions,
        behavioralQuestions:interViewReportByAi.behavioralQuestions,
        skillGaps:interViewReportByAi.skillGaps,
        preprationPlane:interViewReportByAi.preprationPlan

    })

    res.status(201).json({
        message:"Your resume created successfully",
        resume:interviewReport
    })


}


module.exports = {
    generateInterviewReportController
}