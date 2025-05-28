const adminmiddleware=async(req,res,next)=>{
   try{
   console.log(req.user.isadmin);
   const isadminrole=req.user.isadmin;
   if(!isadminrole){
    return res.status(403).json({error:"Access is denied "})
   }
//    res.status(200).json({msg:req.user.isadmin})
    next()

   }
   catch(error){
       next(error)
   }
}

module.exports=adminmiddleware;