import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { createBook, getBooks, updateSelection } from '../api';


const Bookpage = () => {
    const {id} =useParams();
    console.log('id is',id)
    const [bookName,setBookName]=useState('')
    const [author,setAuthor]=useState('')
    const [copies,setCopies]=useState('')
    const [publishedDate,setPublishedDate]=useState('')
    const [redirect,setRedirect]=useState(false)

    useEffect(()=>{
        if(!id) {
            console.log('id is not present')
            return
        }
        console.log('id is present'+id)
        //to fill form fields

        getBooks(id).then(res=>{
            const book=res.data
            console.log('before updating',book)
            setBookName(book.bookName)
            setAuthor(book.author)
            setCopies(book.copies)
            setPublishedDate(book.publishedDate)
console.log('updated form field data',book)
        })
    },[id])

   


    async function addBook(ev){
        ev.preventDefault();
        const book={
            bookName,
            author,
            copies,
            publishedDate}
            if(id){
                await updateSelection(id,book)
            }else{
                await createBook(book)
            }
            setRedirect(true)
      
    }

    function handleRedirect(){
        setRedirect(true)


    }
    
    if(redirect){
        return <Navigate to={'/'}/>
    } 
   

  return (
    <div className='w-[1240px] mx-auto my-10 flex flex-col'>
        <div className='flex justify-between'> 
            <h1 className='text-center font-bold pb-8'>Library Management System</h1>
            <div>
                <button className=' border rounded-xl p-2 bg-blue-800 text-white font-medium mt-2' onClick={handleRedirect} >Report page</button>
            </div>
        </div>
        <form onSubmit={addBook}>
        <div className=''>
            <label className='pr-12'>Bookname:</label>
            <input type="text" placeholder='Enter the book name' id='bookName'
            value={bookName} onChange={ev=>setBookName(ev.target.value)}
            />
        </div>
        <div>
            <label className='pr-12'>Author of the Book:</label>
            <input type="text" placeholder='Enter the author name' id='author'
            value={author} onChange={ev=>setAuthor(ev.target.value)}
            
            />
        </div>
        <div>
            <label className='pr-12'>No of copies available</label>
            <input type="number" placeholder='Enter the count' id='copies'
            value={copies} onChange={ev=>setCopies(ev.target.value)}
            />
        </div>
        <div>
            <label className='pr-12'>Published date:</label>
            <input type="date" id='publishedDate'
            value={publishedDate} onChange={ev=>setPublishedDate(ev.target.value)}
            />
        </div>
    <div className=' flex justify-center items-center"'>
        <button className='bg-blue-800 text-white rounded-md px-4 py-2 mt-4 '>{id ?'Submit Edit': 'Add Book'}</button>
        </div>
        </form>
    </div>
  )
}

export default Bookpage