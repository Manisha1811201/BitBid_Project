const mongoose=require("mongoose");

const rateSchema=new mongoose.Schema({
    clientId:{type:String,default:null},
    developerId:{type:String,default:null},
    rating:{type:String,default:null},
    review:{type:String,default:null},
    status:{type:String,default:"Active"},
    createAt:{type:Date,default:Date.now()}
})

module.exports=new mongoose.model("ratings",rateSchema)