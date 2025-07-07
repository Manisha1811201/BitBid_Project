
const rate=require("./rateModel");

add=(req,res)=>{
    let validationErrors=[];
    
    if(!req.body.clientId){
        validationErrors.push("Client Id is required.")
    }

    if(!req.body.developerId){
        validationErrors.push("Developer Id is required.")
    }

    if(!req.body.rating){
        validationErrors.push("Rating is required.")
    }

    if(!req.body.review){
        validationErrors.push("Review is required.")
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
        
                let rateObj=new rate();
                rateObj.clientId=req.body.clientId
                rateObj.developerId=req.body.developerId
                rateObj.rating=req.body.rating
                rateObj.review=req.body.review
                rateObj.save()
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
    totalCount=await rate.countDocuments().exec()
    rate.find()
    .then((rateData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:rateData,
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
        rate.findOne({_id:req.body._id})
        .then((rateData)=>{
            if(!rateData){
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
                    data:rateData
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
        rate.findOne({_id:req.body._id})
        .then((rateData)=>{
            if(!rateData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data nor found."
                })
            }
            else{
                rate.deleteOne({_id:req.body._id})
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data Deleted successfully",
                        data:rateData
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
        rate.findOne({_id:req.body._id})
        .then((rateData)=>{
            if(!rateData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data nor found."
                })
            }
            else{
                if(req.body.clientId){
                    rateData.clientId=req.body.clientId
                }
                if(req.body.developerId){
                    rateData.developerId=req.body.developerId
                }
                if(req.body.rating){
                    rateData.rating=req.body.rating
                }
                if(req.body.review){
                    rateData.review=req.body.review
                }
                
                rateData.save()
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