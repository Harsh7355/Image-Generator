const express = require('express');
const User = require('../models/user-model');
const bcrypt=require('bcryptjs')

// Home controller
const home = async (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to home page" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Register controller
const register = async (req, res) => {
  try {
    // Retrive the user data
    const{username,email,password,phone}=req.body;

    // check user is exist or not
    const userexist=await User.findOne({email})
    
    if(userexist){
        // console.log("User is already exist")
        return res.status(400).send("email is already exist")
    }

    // hash the password
    // const hash_password=await bcrypt.hash(password,10);

    // create krna hai
   const usercreated=  await User.create({
        username,email,password,phone
    })
  
    res.status(200).json({
        msg:usercreated,
        token: await usercreated.generatetoken(),
        userid:usercreated._id.toString()
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const login = async (req,res)=>{

//     try{
//     const {email,password}=req.body;
    
//        // check user is exist or not
//        const userexist=await User.findOne({email})
//        if(!userexist){
//            // console.log("User is already exist")
//            return res.status(400).send("plzz egister first")
//        }
   
//       const user=await bcrypt.compare(password,userexist.password)

//       if(user){

//         res.status(200).json({
//             msg:"Login Successfull",
//             token: await userexist.generatetoken(),
//             userid:userexist._id.toString()
//         })
//       }

//       else{
//         res.status(404).send("invalid email or password")
//     }
    
//     }
//     catch(error){
//       console.log(error)
//     }

// }


const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      
      // Check if user exists
      const userExist = await User.findOne({ email });
      
      if (!userExist) {
          return res.status(400).send("Please register first");
      }

      // Log the password and the stored hash for debugging
      // console.log('Entered password:', password);
      // console.log('Stored password hash:', userExist.password);

      // Compare the password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, userExist.password);

      if (isPasswordValid) {
          return res.status(200).json({
              msg: "Login Successful",
              token: await userExist.generatetoken(),
              userid: userExist._id.toString()
          });
      } else {
          return res.status(404).send("Invalid email or password");
      }
  } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
  }
}

const user = async(req,res)=>{
  try{
   const userData=req.user;
   console.log(userData);
   return res.status(200).send({userData})
  }catch(error){
    console.log(`Error from the user route ${error}`)
  }

}





module.exports = { home, register,login,user };
