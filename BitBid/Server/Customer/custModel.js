const moongoose = require("mongoose")

const customerSchema = new moongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    contact:{type:String,default:null},
    address:{type:String,default:null},
    userType:{type:Number,default:3},//1- admin,2- developer,3-customer
    userId:{type:moongoose.Schema.Types.ObjectId,default:null,ref:"users"},
    status:{type:String,default:"Active"},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = new moongoose.model("customers",customerSchema);