const express = require('express')
const router = express.Router()
const Category = require('../models/category')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  next();
});

//res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');

//Get ALl Categorys
router.get('/', async (req, res) => {
  try {
	//res.send("hello"); 
	Category.find({}, (err, categories) => {
            res.json(categories)
        })  
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}) 

//GET ONE Category
router.get('/:id',getCategory, (req, res) => {
res.json(res.category)
}) 


//Post ONE Category
router.post('/',async (req,res) => {
  const category = new Category({
      category_id: req.body.category_id,
      category_name:req.body.category_name,
      sub_categories:[{
        subcategory_id:req.body.subcategory_id,
        subcategory_name:req.body.subcategory_name
        }]
  })
  try{
      const newcategory = await category.save()
      res.status(201).json(newcategory)
  }
  catch(err){
          res.status(400).json(err.message)
  }
})
//Patch ONE
//Updating One
router.patch('/:id',getCategory, async(req,res)=>{
  if(req.body.category_name != null){
      res.category.category_name = req.body.category_name
  }
  if(req.body.category_id != null){
    res.category.category_id = req.body.category_id
  }
  if(req.body.subcategory_id != null&& req.body.subcategory_name!=null){
    var sub_cato={subcategory_id:req.body.subcategory_id, subcategory_name:req.body.subcategory_name}
    res.category.sub_categories.push(sub_cato);
    //res.category.sub_categories.push(req.body.subcategory_id)
   // var x= res.category.sub_categories.length()
   //var x= { $size: <res.body.sub_categories> }
   //res.body.sub_categories.count()
    //res.category.sub_categories[x].subcategory_id = req.body.subcategory_id
  }

  try{
    const upddatedcategory = await res.category.save()
    res.json(upddatedcategory)
  }
    catch(err){
      res.status(400).json({message: err.message})
  }
})

//Deleting ONE
router.delete('/:id', getCategory,async (req,res)=>{
  try{
      await res.category.remove()
      res.json({message: 'Deleted Question'})
  }catch(err){
      res.status(500).json({message: err,message})
  }
})


//Middleware for ID
async function getCategory(req,res,next){
  let category
try{
category = await Category.findById(req.params.id)
if(category == null){
  //404 for Coudnt find anything
  return res.status(404).json({message: 'Cannot find category'})
}
}catch(err){
  return res.status(500).json({message: err.message})
}
res.category = category
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
}

module.exports = router 


