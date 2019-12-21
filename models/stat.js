const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    category_id:{ 
		type: Number,required:true},
	category_name:String,

    subcategories:[{
		subcategory_name: String, 
        subcategory_id:Number,
        aCorr: {
            type:Number,required:true}, 
        aFalse: {
            type:Number,required:true},
	}]

})

module.exports = mongoose.model('Stat', statSchema, 'stats'); 