const express = require('express')
const router = express.Router()
const SubCategory = require('../models/subcategory')
//const mongoose = require('mongoose'); 
//const connection = require('./db/connectDB'); 

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.get('/', async (req, res) => {
  try {
	//res.send("hello"); 
 
	SubCategory.find({}, (err, subcategories) => {
            res.json(subcategories)
        })  
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}) 




module.exports = router 


