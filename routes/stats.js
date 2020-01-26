const express = require('express')
const router = express.Router()
const Stat = require('../models/stat')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  next();
});


//checks for query params, gets all if none given WORKS
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
  
  
  //Get ONE Works
  router.get('/:id',getStat, (req,res) =>{
    res.json(res.stat)
  })
  
  //Post ONE Stat Works
  router.post('/',async (req,res) => {
      const stat = new Stat({
          category_id: req.body.category_id,
          category_name:req.body.category_name,
            subcategory_id:req.body.subcategory_id,
            subcategory_name:req.body.subcategory_name, 
            aCorr:req.body.aCorr, 
            aFalse:req.body.aFalse
      })
      try{
          const newStat = await stat.save()
          res.status(201).json(newStat)
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
      if (req.body.aCorr != null && req.body.aFalse != null) {
        res.stat.aCorr = req.body.aCorr
        res.stat.aFalse = req.body.aFalse
      }
      try{
        const upddatedStat = await res.stat.save()
        res.json(upddatedStat)
      }
        catch(err){
          res.status(400).json({message: err.message})
      }
    })
    
    //Deleting ONE
    router.delete('/:id', getStat,async (req,res)=>{
        try{
            await res.stat.remove()
            res.json({message: 'Deleted Question'})
        }catch(err){
            res.status(500).json({message: err,message})
        }
      })

    router.delete('/', async (req, res) => {
      try{
        if(req.body.category_id !== undefined && req.body.subcategory_id !== undefined) {
          var nameC = req.body.category_id;
          var nameS = req.body.subcategory_id;
          await Stat.deleteMany({category_id : nameC, subcategory_id:nameS } )
          res.json({message: 'Deleted Stat'})
        } else if ( req.body.category_id !== undefined) {
          var nameC = req.body.category_id;
          await Stat.deleteMany({category_id : nameC } )
          res.json({message: 'Deleted Stat'})
        }
      }catch (err) {
        res.status(500).json({ message: err, message })
      }
    })
    
    //Middleware for ID
    async function getStat(req,res,next){
      let stat
    try{
    stat = await Stat.findById(req.params.id)
    if(stat == null || stat == undefined){
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
