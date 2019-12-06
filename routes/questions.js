const express = require('express')
const router = express.Router()
const Question = require('../models/question')

//Get All
router.get('/', async (req, res) => {
  try {
	//res.send("hello"); 
 
	Question.find({}, (err, questions) => {
            res.json(questions)
        })  
  } catch (err) {
    res.status(500).json({ messsage: err.message })
  }
})

//Get ONE
router.get('/:id',getQuestion, (req,res) =>{
  res.json(res.question)
})

//Post ONE
router.post('/',async (req,res) => {
  const question = new Question({
      question: req.body.question,
      category_id: req.body.category_id,
      category_name:req.body.category_name,
      subcategory_id:req.body.subcategory_id,
      subcategory_name:req.body.subcategory_name,
      answers:[{
        aText:req.body.answer,
        trueOrFalse:req.body.boolean
      },
      {
        aText:req.body.answer1,
        trueOrFalse:req.body.boolean1
      },
      {
        aText:req.body.answer2,
        trueOrFalse:req.body.boolean2
      },
      {
        aText:req.body.answer3,
        trueOrFalse:req.body.boolean3
      }
    ]
  })
  try{
      const newquestion = await question.save()
      res.status(201).json(newquestion)

  }
  catch(err){
          res.status(400).json(err.message)
  }
})


//Patch ONE
//Updating One
router.patch('/:id',getQuestion, async(req,res)=>{
  if(req.body.question != null){
      res.question.question = req.body.question
  }
  if(req.body.category_name != null){
      res.question.category_name = req.body.category_name
  }
  if(req.body.category_id != null){
    res.question.category_id = req.body.category_id
  }
  if(req.body.subcategory_id != null){
    res.question.subcategory_id = req.body.subcategory_id
  }
  if(req.body.subcategory_name != null){
    res.question.subcategory_name = req.body.subcategory_name
  }
  if(req.body.answer != null){
    res.question.answers[0].aText = req.body.answer
  }
  if(req.body.answer1 != null){
    res.question.answers[1].aText = req.body.answer1
  }
  if(req.body.answer2 != null){
    res.question.answers[2].aText = req.body.answer2
  }
  if(req.body.answer3 != null){
    res.question.answers[3].aText = req.body.answer3
  }
  if(req.body.boolean != null){
    res.question.answers[0].trueOrFalse = req.body.boolean
  }
  if(req.body.boolean1 != null){
    res.question.answers[1].trueOrFalse = req.body.boolean1
  }
  if(req.body.boolean2 != null){
    res.question.answers[2].trueOrFalse = req.body.boolean2
  }
  if(req.body.boolean3 != null){
    res.question.answers[3].trueOrFalse = req.body.boolean2
  }
  try{
          const updatedQuestion = await res.question.save()
          res.json(updatedQuestion)
  }
    catch(err){
      res.status(400).json({message: err.message})
  }
})

//Deleting ONE
router.delete('/:id', getQuestion,async (req,res)=>{
  try{
      await res.question.remove()
      res.json({message: 'Deleted Question'})
  }catch(err){
      res.status(500).json({message: err,message})
  }
})


//Middleware for ID
async function getQuestion(req,res,next){
  let question
try{
question = await Question.findById(req.params.id)
if(question == null){
  //404 for Coudnt find anything
  return res.status(404).json({message: 'Cannot find question'})
}
}catch(err){
  return res.status(500).json({message: err.message})
}
res.question = question
next()
}

module.exports = router 