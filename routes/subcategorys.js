const express = require('express')
const router = express.Router()
const SubCategory = require('../models/subcategory')
//const mongoose = require('mongoose'); 
//const connection = require('./db/connectDB'); 



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


