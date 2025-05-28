const express = require('express');
const { home, register, login, user } = require('../controller/auth-controller');
const signupSchema = require('../validators/auth-validator');
const validate = require('../middleware/validate-middleware');
const authMiddleware=require('../middleware/auth-middleware')

const Router = express.Router();

// Home Route (GET or POST as per your needs)
Router.get('/', home);

// Register Route (Validated with signupSchema)
Router.post('/register', validate(signupSchema), register);

// Login Route (Changed to POST)
Router.post('/login', login);

// create a user route to get all idenctical information 
Router.get('/user',authMiddleware,user)

module.exports = Router;
