const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
	category_id:{ 
		type: Number,required:true},
	category_name:String,

	sub_categories:[{
		subcategory_name: String, 
		subcategory_id:Number
	}]

})

module.exports = mongoose.model('Category', categorySchema, 'categorys' ); 





