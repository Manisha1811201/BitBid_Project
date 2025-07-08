const task=require("./taskModel")

add=(req,res)=>{
    let validationErrors=[];

    if(!req.body.taskName){
        validationErrors.push("Task name is required.")
    }

     if(!req.body.taskDescription){
        validationErrors.push("Task description is required.")
    }

     if(!req.body.bidId){
        validationErrors.push("Bid id is required.")
    }

     if(!req.body.developerId){
        validationErrors.push("Developer id is required.")
    }

     if(!req.body.clientId){
        validationErrors.push("Client Id is required.")
    }

     if(!req.body.completionDate){
        validationErrors.push("completion Date is required.")
    }

     if(!req.body.taskAttachments){
        validationErrors.push("Task attachments is required.")
    }

    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occures.",
            error:validationErrors
        })
    }

     else{
            
                    let taskObj=new task();
                    taskObj.taskName=req.body.taskName
                    taskObj.taskDescription=req.body.taskDescription
                    taskObj.bidId=req.body.bidId
                    taskObj.developerId=req.body.developerId
                    taskObj.clientId=req.body.clientId
                    taskObj.completionDate=req.body.completionDate
                    taskObj.taskAttachments=req.body.taskAttachments
                    taskObj.save()
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
            
        
}

getall=async(req,res)=>{
    totalCount=await task.countDocuments().exec()
    task.find()
    .then((taskData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:taskData,
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
        task.findOne({_id:req.body._id})
        .then((taskData)=>{
            if(!taskData){
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
                    data:taskData
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

deleteData =(req,res)=>{
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
        task.findOne({_id:req.body._id})
        .then((taskData)=>{
            if(!taskData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found."
                })
            }
            else{
                task.deleteOne({_id:req.body._id})
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data Deleted successfully",
                        data:taskData
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
        task.findOne({_id:req.body._id})
        .then((taskData)=>{
            if(!taskData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found."
                })
            }
            else{
                if(req.body.taskName){
                    taskData.taskName=req.body.taskName
                }
                if(req.body.taskDescription){
                    taskData.taskDescription=req.body.taskDescription
                }
                if(req.body.bidId){
                    taskData.bidId=req.body.bidId
                }
                if(req.body.developerId){
                    taskData.developerId=req.body.developerId
                }
                if(req.body.clientId){
                    taskData.clientId=req.body.clientId
                }
                if(req.body.completionDate){
                    taskData.completionDate=req.body.completionDate
                }
                if(req.body.taskAttachments){
                    taskData.taskAttachments=req.body.taskAttachments
                }
                
                taskData.save()
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
    add,getall,getsingleData,deleteData,updateData
}