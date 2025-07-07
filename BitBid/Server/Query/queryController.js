
const query=require("./queryModel");

add=(req,res)=>{
    let validationErrors=[];
    
    if(!req.body.name){
        validationErrors.push("name is required.")
    }

    if(!req.body.email){
        validationErrors.push("email Id is required.")
    }

    if(!req.body.subject){
        validationErrors.push("subject is required.")
    }

    if(!req.body.message){
        validationErrors.push("message is required.")
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
        
                let queryObj=new query();
                queryObj.name=req.body.name
                queryObj.email=req.body.email
                queryObj.subject=req.body.subject
                queryObj.message=req.body.message
                queryObj.save()
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
    totalCount=await query.countDocuments().exec()
    query.find()
    .then((queryData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:queryData,
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
        query.findOne({_id:req.body._id})
        .then((queryData)=>{
            if(!queryData){
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
                    data:queryData
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
        query.findOne({_id:req.body._id})
        .then((queryData)=>{
            if(!queryData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data nor found."
                })
            }
            else{
                query.deleteOne({_id:req.body._id})
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data Deleted successfully",
                        data:queryData
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
        query.findOne({_id:req.body._id})
        .then((queryData)=>{
            if(!queryData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data nor found."
                })
            }
            else{
                if(req.body.name){
                    queryData.name=req.body.name
                }
                if(req.body.email){
                    queryData.email=req.body.email
                }
                if(req.body.subject){
                    queryData.subject=req.body.subject
                }
                if(req.body.message){
                    queryData.message=req.body.message
                }
                
                queryData.save()
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