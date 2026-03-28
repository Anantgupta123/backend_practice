import noteModel from "../models/note.model.js";
import userModel from "../models/user.model.js";



//Create a note 
async function createNote(req,res){

    const {title,data} = req.body;
    

    const userNote = await noteModel.create({
        title,
        data
    })

    // const user  = await userModel.findById()
    // pura project hone ke bad isko karna ha i bc


    res.status(200).json({
        message:"Note is created successfully",
        title:userNote.title,
        data:userNote.data
    })
}


// Get all note 
async function getAllnote(req,res){

    const allNote = await noteModel.find()

    res.status(200).json({
        message:"Note is fetch successfully",
        Note:allNote
    })


}


// Get note by id specific
async function getNoteById(req,res){

    const {id} = req.params;

    const note = await noteModel.findById(id);

    if(!note){

        return res.status(404).json({
            message:"This id is not found"
        })
    }

    res.status(200).json({
        message:"Get your data",
        note:note
    })


}


// Update a note
async function updateNote(req,res){

    const {id} = req.params;
    const {data} = req.body

    const updatenote = await noteModel.findByIdAndUpdate(
        id,
        {data},
        {new:true}
    )

    

    res.status(200).json({
        message:"Your data is updated",
        note:updatenote
    })


} 


async function deleteNote(req,res){

    try {
        const {id} = req.params;
    
        const deletenote = await noteModel.findByIdAndDelete(id)
    
        res.status(200).json({
            message:"Your data is deleted successfully",
            note:deletenote
        })
    } catch (error) {

        console.log(error)

        return res.status(404).json({
            message:"fail"
            
        })
        
    }
}






export default {
    createNote,
    getAllnote,
    getNoteById,
    updateNote,
    deleteNote

}