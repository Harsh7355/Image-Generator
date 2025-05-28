const express = require('express');
const Router = express.Router();
const { getallusers, getallcontacts,getallservices,getalldeletes,updateUserById } = require('../controller/admin-controller.js');
const authmiddleware=require('../middleware/auth-middleware.js')
const adminmiddleware=require('../middleware/admin-middleware.js')

// Routes
Router.get('/users', authmiddleware,adminmiddleware,getallusers);
Router.get('/services', authmiddleware,adminmiddleware,getallservices);
Router.get('/contacts', authmiddleware,adminmiddleware,getallcontacts);
Router.delete('/users/:id',authmiddleware,adminmiddleware,getalldeletes)
Router.patch('/users/:id', authmiddleware, adminmiddleware, updateUserById);


module.exports = Router;
