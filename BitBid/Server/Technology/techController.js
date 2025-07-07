const tech=require("./techModel");

add=(req,res)=>{
    let validationErrors=[];
    
    if(!req.body.techName){
        validationErrors.push("Technology name is required.")
    }

    if(!req.body.description){
        validationErrors.push("Description is required.")
    }
    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs.",
            error:validationErrors
        })
    }


    else{
        tech.findOne({techName:req.body.techName})
        .then((techData)=>{
            if(!techData){
                let techObj=new tech();
                techObj.techName=req.body.techName
                techObj.description=req.body.description
                techObj.save()
                .then((resData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data added succesfully.",
                        data:resData
                    })
                })
                .catch((error)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error.",
                        error:error.message
                    })
                })
            }
            else{
                res.json({
                    status:422,
                    success:false,
                    message:"Data already exits.",
                    data:techData
                })
            }
        })
        .catch((error)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error.",
                error:error.message
            })
        })
    }
}


getall=async(req,res)=>{
    totalCount=await tech.countDocuments().exec()
    tech.find()
    .then((techData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:techData,
            total:totalCount
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error.",
            error:err.message
        })
    })
}


getsingleData=(req,res)=>{
    let validationErrors=[];
    if(!req.body._id){
        validationErrors.push("id is required")
    }
    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationErrors
        })
    }
    else{
        tech.findOne({_id:req.body._id})
        .then((techData)=>{
            if(!techData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Data loaded successfully.",
                    data:techData
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err.message
            })
        })
    }
}

deletedata =(req,res)=>{
    let validationErrors=[];
    if(!req.body._id){
        validationErrors.push("id is required")
    }
    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationErrors
        })
    }
    else{
        tech.findOne({_id:req.body._id})
        .then((techData)=>{
            if(!techData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data nor found."
                })
            }
            else{
                tech.deleteOne({_id:req.body._id})
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data Deleted successfully",
                        data:techData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err.message
                    })
                })
            }
        })
    }
}

updateData=(req,res)=>{
    let validationErrors=[];
    if(!req.body._id){
        validationErrors.push("id is required")
    }
    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationErrors
        })
    }

    else{
        tech.findOne({_id:req.body._id})
        .then((techData)=>{
            if(!techData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data nor found."
                })
            }
            else{
                if(req.body.techName){
                    techData.techName=req.body.techName
                }
                if(req.body.description){
                    techData.description=req.body.description
                }
                
                techData.save()
                .then((resData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated successfully.",
                        data:resData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err.message
                    })
                })
            }
        })
         .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err.message
                    })
                })
    }
}

module.exports={
    add,getall,getsingleData,deletedata,updateData
}