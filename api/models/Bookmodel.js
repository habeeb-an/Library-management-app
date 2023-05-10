const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({
    bookName:{type:String,required:true},
    author:{type:String,required:true},
    copies:{type:Number,required:true},
    publishedDate:{type:Date,required:true},
    addedDate:{type:Date,
                 default:Date.now }
})
const bookModel=mongoose.model('Bookmodel',bookSchema);
module.exports=bookModel;