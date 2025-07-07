const mongoose=require("mongoose");

const bidSchema=new mongoose.Schema({
    clientId:{type:String,default:null},
    postId:{type:String,default:null},
    developerId:{type:String,default:null},
    bidAmount:{type:String,default:null},
    description:{type:String,default:null},
    deadlineEstimate:{type:String,default:null},
    status:{type:String,default:"Active"},
    createAt:{type:Date,default:Date.now()}
})

module.exports=new mongoose.model("bids",bidSchema)