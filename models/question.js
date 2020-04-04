const mongoose = require('mongoose')
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const questionSchema = new mongoose.Schema({
			question : String,
			category_id:{ 
				type: Number,required:true},
			category_name:String,
			subcategory_id:{
				type:Number,required:true},
			subcategory_name:String, 
			triggerQuestion:Boolean, required:false,
			triggerType:String,required:false,
			answers : [{
				aText: String, 
				trueOrFalse:Boolean
			}]
        
    })
	



module.exports = mongoose.model('Question', questionSchema, 'questions' ); 