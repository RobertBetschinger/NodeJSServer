require('dotenv').config()


const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,{ 
    useNewUrlParser: true ,
     useUnifiedTopology: true,
     dbName: "FragenDatabase"

});

const db = mongoose.connection

db.on('error', (error) =>console.error(error))
db.once('open', function () {
    console.log('Connected to Atlas Database')
    db.db.collection("eigeneFragen", function(err, collection){
        collection.find().toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });

});

// Wenn neues Schema--> überarbeiten
app.use(express.json())

const categoryRouter = require('./routes/categorys')
app.use('/categorys', categoryRouter)



const questionRouter = require('./routes/questions')
app.use('/questions', questionRouter)

app.listen(process.env.PORT || 80, ()=> console.log('Server Started'))
