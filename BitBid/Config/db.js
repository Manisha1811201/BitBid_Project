const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/BitBid_project")
.then(()=>{
    console.log("Database Is Connected Successfully. :)");
})
.catch((error)=>{
    console.log("Database is Connected. :(");
    console.log(error);
})