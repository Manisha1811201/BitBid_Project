
const post=require("./postModel");

add=(req,res)=>{
    let validationErrors=[];
    
    if(!req.body.title){
        validationErrors.push("Title name is required.")
    }

    if(!req.body.technologyId){
        validationErrors.push("Technology Id is required.")
    }

    if(!req.body.budget){
        validationErrors.push("Budget is required.")
    }

    if(!req.body.deadline){
        validationErrors.push("Deadline is required.")
    }

    if(!req.body.clientId){
        validationErrors.push("Client Id is required.")
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
        
                let postObj=new post();
                postObj.title=req.body.title
                postObj.technologyId=req.body.technologyId
                postObj.budget=req.body.budget
                postObj.deadline=req.body.deadline
                postObj.clientId=req.body.clientId
                postObj.description=req.body.description
                postObj.save()
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
    totalCount=await post.countDocuments().exec()
    post.find()
    .then((postData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:postData,
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
        post.findOne({_id:req.body._id})
        .then((postData)=>{
            if(!postData){
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
                    data:postData
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
        post.findOne({_id:req.body._id})
        .then((postData)=>{
            if(!postData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data nor found."
                })
            }
            else{
                post.deleteOne({_id:req.body._id})
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data Deleted successfully",
                        data:postData
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

updateData =(req,res)=>{
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
        post.findOne({_id:req.body._id})
        .then((postData)=>{
            if(!postData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found."
                })
            }
            else{
                if(req.body.title){
                    postData.title=req.body.title
                }
                if(req.body.technologyId){
                    postData.technologyId=req.body.technologyId
                }
                if(req.body.budget){
                    postData.budget=req.body.budget
                }
                if(req.body.deadline){
                    postData.deadline=req.body.deadline
                }
                if(req.body.clientId){
                    postData.clientId=req.body.clientId
                }
                if(req.body.description){
                    postData.description=req.body.description
                }
                postData.save()
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