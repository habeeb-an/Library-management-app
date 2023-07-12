const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
require('dotenv').config();
var cors = require('cors');

const Bookmodel=require('./models/Bookmodel.js')

const whitelist=['https://library-management-app.vercel.app','http://localhost:5173']
const app=express()
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    credentials:true,
    origin:'https://library-management-app.vercel.app'
}));

const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.post('/books',async (req,res)=>{
  console.log('report post working')
    const {bookName,author,copies,publishedDate}=req.body
    const report=await Bookmodel.create({
        bookName,
        author,
        copies,
        publishedDate,

    })
    res.json(report)
})



// search filter
app.get('/books',async (req,res)=>{
  const {search,sortByDate}=req.query
  let sorting={addedDate:1}
  let filter ={}
  if(search){
    filter.author={ $regex: `^${search}`, $options: 'i' }
  }
  if(sortByDate==='desc'){
    sorting={addedDate:-1}
  }
await Bookmodel.find(filter).sort(sorting).then((results)=>{
  res.json(results)
}).catch(err=>{
  console.log('error',err)
}) 
  })

//delete book 
app.delete('/books/:id',async (req,res)=>{
  const {id}=req.params
  console.log('params are=',req.params)
  console.log('query is=',req.query)
 await Bookmodel.findByIdAndDelete(id).then((result)=>{
  console.log('deleted',result)
  res.json(res)
 }

 ).catch(err=>{
    console.log('error',err)
  })
})
//update field updating
app.get('/books/:id',(req,res)=>{
  const {id}=req.params
  console.log(id)
  Bookmodel.findById(id).then((results)=>{
    res.json(results)
  })

})
  
//update book
app.put('/books/:id',async (req,res)=>{
 const {id}=req.params
 const updatedBook=req.body 
 console.log('updated book=',updatedBook)
  Bookmodel.findByIdAndUpdate(id,updatedBook).then((updatedDoc)=>{
    console.log('current updated doc=',updatedDoc)
    res.json(updatedDoc)
  }).catch(err=>{
    console.log('error',err)
    
  })

})


app.listen(PORT,()=>{
console.log('server is running on port 5000')})
