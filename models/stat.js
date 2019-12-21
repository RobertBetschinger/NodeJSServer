const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    category_id:{ 
		type: Number,required:true},
	category_name:String,

	sub_categories:[{
		subcategory_name: String, 
        subcategory_id:Number,
        aCorr : Number, 
        aFalse: Number
	}]

})

module.exports = mongoose.model('Stat', statSchema, 'stats'); 