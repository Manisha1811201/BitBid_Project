const bid=require("./bidModel");

add=(req,res)=>{
    let validationErrors=[];
    
    if(!req.body.clientId){
        validationErrors.push("Client Id is required.")
    }

    if(!req.body.postId){
        validationErrors.push("Post Id is required.")
    }

    if(!req.body.developerId){
        validationErrors.push("Developer Id is required.")
    }

    if(!req.body.bidAmount){
        validationErrors.push("Bid amount is required.")
    }

    if(!req.body.description){
        validationErrors.push("Description is required.")
    }

     if(!req.body.deadlineEstimate){
        validationErrors.push("Deadline Estimate  is required.")
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
        
                let bidObj=new bid();
                bidObj.clientId=req.body.clientId
                bidObj.postId=req.body.postId
                bidObj.developerId=req.body.developerId
                bidObj.bidAmount=req.body.bidAmount
                bidObj.description=req.body.description
                bidObj.deadlineEstimate=req.body.deadlineEstimate
                bidObj.save()
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
    totalCount=await bid.countDocuments().exec()
    bid.find()
    .then((bidData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:bidData,
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
        bid.findOne({_id:req.body._id})
        .then((bidData)=>{
            if(!bidData){
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
                    data:bidData
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
        bid.findOne({_id:req.body._id})
        .then((bidData)=>{
            if(!bidData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data nor found."
                })
            }
            else{
                bid.deleteOne({_id:req.body._id})
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data Deleted successfully",
                        data:bidData
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
        bid.findOne({_id:req.body._id})
        .then((bidData)=>{
            if(!bidData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data nor found."
                })
            }
            else{
                if(req.body.clientId){
                    bidData.clientId=req.body.clientId
                }
                if(req.body.postId){
                    bidData.postId=req.body.postId
                }
                if(req.body.developerId){
                    bidData.developerId=req.body.developerId
                }
                if(req.body.bidAmount){
                    bidData.bidAmount=req.body.bidAmount
                }
                if(req.body.description){
                    bidData.description=req.body.description
                }
                if(req.body.deadlineEstimate){
                    bidData.deadlineEstimate=req.body.deadlineEstimate
                }
                bidData.save()
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