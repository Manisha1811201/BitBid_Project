const express=require("express");
const app=express();
const port=9090;
const seeder=require("./Config/seeder")
seeder.adminSeeder()

const config=require("./Config/db");

app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:"50mb"}))
const routes=require("./Routes/apiroutes");
app.use("/api",routes)

app.listen(port,()=>{
    console.log("My BitBid Project Port Number Is:"+" "+port);
})