const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
require('dotenv').config();
var cors = require('cors');

const Bookmodel=require('./models/Bookmodel.js')

const app=express()
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));



mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.post('/report',async (req,res)=>{
    const {bookName,author,copies,publishedDate}=req.body
    if(err) throw err;
    const report=await Bookmodel.create({
        bookName,
        author,
        copies,
        publishedDate,

    })
    res.json(report)
})

//find all books
app.get('/', (req, res) => {
    Bookmodel.find({}, (error, books) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error retrieving books from database');
      } else {
        res.status(200).send(books);
      }
    });
  });


app.listen(5000)