const express=require('express')
const users=require('../models/user-model')
const services=require('../models/service-model')
const contacts=require('../models/contact-model')

const getallusers =async (req,res)=>{

    try{
      const data=await users.find().select({password:0})
      if(!data && data.length===0){
        return res.status(401).send({msg:"Not user found"})
      }
        return res.status(200).json(data)
}
    catch(error){
        console.log("Error is received from fetching the details",error)
    }
}

const getallservices =async(req,res)=>{
   try{
     const data=await services.find()
     if(!data && data.length==0){
      return res.status(401).send({msg:"Not service found"})
     }
   
     return res.status(200).json(data)

   }catch(error){
    console,log("Error is received from backend side",error.message)
   }
}


const getallcontacts =async (req,res)=>{

    try{
      const data=await contacts.find()
      if(!data && data.length===0){
        return res.status(401).send({msg:"Not user found"})
      }
        return res.status(200).json(data)
}
    catch(error){
        console.log("Error is received from fetching the details",error)
    }
}

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    // Only allow name, email, and phone to be updated
    const allowedFields = ['username', 'email', 'phone'];
    const updateFields = {};

    allowedFields.forEach((field) => {
      if (updates[field]) {
        updateFields[field] = updates[field];
      }
    });

    const updatedUser = await users.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.log("Error updating user:", error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};


const getalldeletes =async(req,res)=>{
  try{
    const id=req.params.id;
    await users.deleteOne({_id:id})
    return res.status(200).send({msg:"User Data Delete successfully"})

  }catch(error){
    console.log("Deleted users is an Backend issue:",error.message)
  }
}

module.exports={getallusers,getallcontacts,getallservices,getalldeletes,updateUserById};