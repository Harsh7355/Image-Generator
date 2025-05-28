const express=require('express');
const Router=express.Router();
const serviceform=require('../controller/service-form')

Router.get('/service',serviceform)

module.exports=Router;

