const express = require('express')
const router = express.Router()
const Stat = require('../models/stat')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  next();
});


//checks for query params, gets all if none given
router.get('/', async (req, res) => {
  try {
    if (req.query.subcategory_name !== undefined && req.query.category_name !== undefined) {
    var nameSC = req.query.subcategory_name; 
    var nameC = req.query.category_name;  

    let articles = await Stat.find({subcategory_name: nameSC, category_name: nameC}).exec();
    res.json(articles); 
    //res.send(nameSC); 
  } else {
    Stat.find({}, (err, stats) => {
      res.json(stats)
  })  
}
  } catch(err) {
    res.status(404).json({ message: err.message })
  }
})


//Get ONE
router.get('/:id',getStat, (req,res) =>{
  res.json(res.question)
})

//Post ONE Stat
router.post('/',async (req,res) => {
    const stat = new Stat({
        category_id: req.body.category_id,
        category_name:req.body.category_name,
        sub_categories:[{
          subcategory_id:req.body.subcategory_id,
          subcategory_name:req.body.subcategory_name, 
          aCorr:req.body.aCorr, 
          aFalse:req.body.aFalse
          }]
    })
    try{
        const newStat = await stat.save()
        res.status(201).json(newcategory)
    }
    catch(err){
            res.status(400).json(err.message)
    }
  })


  //Patch ONE
  //Updating One
  router.patch('/:id',getStat, async(req,res)=>{
    if(req.body.category_name != null){
        res.stat.category_name = req.body.category_name
    }
    if(req.body.category_id != null){
      res.stat.category_id = req.body.category_id
    }
    if(req.body.subcategory_id != null&& req.body.subcategory_name!=null){
      var sub_cato={subcategory_id:req.body.subcategory_id, subcategory_name:req.body.subcategory_name, aCorr:req.body.aCorr, aFalse:req.body.aFalse}
      res.category.sub_categories.push(sub_cato);
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
  router.delete('/:id', getStat,async (req,res)=>{
    try{
        await res.category.remove()
        res.json({message: 'Deleted Question'})
    }catch(err){
        res.status(500).json({message: err,message})
    }
  })
  
  
  //Middleware for ID
  async function getStat(req,res,next){
    let stat
  try{
  stat = await Stat.findById(req.params.id)
  if(stat == null){
    //404 for Coudnt find anything
    return res.status(404).json({message: 'Cannot find stat'})
  }
  }catch(err){
    return res.status(500).json({message: err.message})
  }
  res.stat = stat
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  }

module.exports = router 