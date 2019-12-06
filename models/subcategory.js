const mongoose = require('mongoose')
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const subcategorySchema = new mongoose.Schema({
	 
	sub_catgories : [{
		sub_category_id: Number, 
		sub_category_name: String, 
		questions : [{
			id : Number, 
			q : String, 
			answers : [{
				aText : String, 
				trueOrFalse: Boolean
			}]
		}]
	}]
})



module.exports = mongoose.model('SubCategory', subcategorySchema, 'eigeneFragen' ); 