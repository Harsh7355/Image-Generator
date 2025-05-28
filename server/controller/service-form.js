const express = require('express');
const Service = require('../models/service-model');

const serviceform = async (req, res) => {
  try {
    const response = await Service.find(); 
    // console.log(response); 
    res.status(200).json(response); 
  } catch (error) {
    console.log("Message is occured", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = serviceform;
