const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    taskName:{type:String,default:null},
    taskDescription:{type:String,default:null},
    bidId:{type:String,default:null},
    developerId:{type:String,default:null},
    clientId:{type:String,default:null},
    completionDate:{type:String,default:null},
    taskAttachments:{type:String,default:null},
    status:{type:String,default:"Active"},
    createAt:{type:Date,default:Date.now()}
})

module.exports=new mongoose.model("tasks",taskSchema)