import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const Bookpage = () => {
    const [bookName,setBookName]=useState('')
    const [author,setAuthor]=useState('')
    const [copies,setCopies]=useState('')
    const [publishedDate,setPublishedDate]=useState('')
    const [redirect,setRedirect]=useState(false)

   
 useEffect(()=>{
    axios.get('/reports').then(res=>{
        const {data}=res;
        setBookName(data.bookName)
        setAuthor(data.author)
        setCopies(data.copies)
        setPublishedDate(data.publishedDate)
    })
},[])


    async function addBook(ev){
        ev.preventDefault();
        const book={
            bookName,
            author,
            copies,
            publishedDate}
        await axios.post('/report',book)
        setRedirect(true)
    }

    if(redirect){
        return <Navigate to={'/'}/>
    } 

  return (
    <div className='w-full-[1240px] mx-4 my-4 flex flex-col'>
        <div>
            <h1 className='text-center font-bold pb-8'>Library Management System</h1>
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
        <button className='bg-blue-800 text-white rounded-md px-4 py-2 mt-4 '>Add Book</button>
        </div>
        </form>
    </div>
  )
}

export default Bookpage