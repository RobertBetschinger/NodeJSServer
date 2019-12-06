const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
	category_id:{ 
		type: Number,required:true},
	category_name:String,
	sub_categories : [{
		subcategory_name: String, 
		subcategory_id:Number
	}]
})

module.exports = mongoose.model('Category', categorySchema, 'categorys' ); 





/*
const mongoose = require('mongoose')
/*
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
*/
/*
const categorySchema = new mongoose.Schema({
	categories : [{
	category_id : Number,
	category_name : String, 
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
	}]
})



module.exports = mongoose.model('Category', categorySchema, 'eigeneFragenSplit' ); 
*/