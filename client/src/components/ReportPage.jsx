import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteBook, getFilter} from '../api'

import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';


function ReportPage() {
  const [reports,setReports]=useState([])
  const [sortByDate,setSortByDate]=useState('')
  const [search,setSearch]=useState('')

 
      
    useEffect(()=>{
      getFilter({search,sortByDate}).then(res=>{
        console.log(res.data)
        setReports(res.data)
      })
    },[search,sortByDate])

    
    async function deleteDoc(ev,id){
      ev.preventDefault();
      setReports(reports.filter((del)=>del._id!==id))
      console.log(id)
      await deleteBook(id).then(res=>{
        console.log('Book delted of id',res.data)
      })

    }
  
    

async function handleSearch(ev){
  ev.preventDefault();
  
}



  return (
    <div>
      
  
        <div className='flex justify-between items-center py-4  mx-8'>
            <h1 className='font-bold text-center  '>Report Page</h1>
                <div className='flex gap-2'>
                  <input type='text' placeholder='Search by author' value={search} onChange={(ev)=>setSearch(ev.target.value)}></input>
                  <button className=' px-2 my-2 border bg-gray-200 rounded-3xl' onClick={handleSearch}>< AiOutlineSearch/></button>

                </div>
                <div>
                    <select 
                    className='border font-medium p-1 rounded-lg' 
                    id='sortByDate'
                    value={sortByDate}
                    onClick={handleSearch}
                    onChange={(ev)=>setSortByDate(ev.target.value)} >
                    
                        
                        <option value='asc' >Ascending</option>
                      
                        <option value='desc'>Descending</option>
                    </select>
                </div>
            <div className='bg-blue-600 text-white items-center justify-center text-center flex-none'>
                <Link to={'/bookpage'} className='mx-auto my-auto px-2 py-2 font-semibold rounded-md'>Add Book</Link>
             </div>
        </div>
        {reports.length >0 ? reports.map((report)=>(
          
           <div className='font-serif font-medium bg-gray-200 rounded-lg mx-8 my-4 py-2' key={report._id}>
              <button className='cursor-pointer absolute right-10 text-white bg-black bg-opacity-50 rounded-lg py-2 px-4' onClick={(ev)=>deleteDoc(ev,report._id)}>
               <AiOutlineDelete/>
              </button>
              <Link to={`/update/${report._id}`} className='cursor-pointer absolute right-10 mt-9 text-white bg-black bg-opacity-50 rounded-lg py-2 px-4' onClick={ev=>updateData(ev,report._id)}>< AiOutlineEdit/></Link>

           <div  className=' px-2'>
            <h1 className='py-1 px-2'>Bookname:{report.bookName}</h1>
            <h1 className='py-1 px-2'>Author:{report.author}</h1>
            <h1 className='py-1 px-2'>No of copies:{report.copies}</h1>
            <h1 className='py-1 px-2'>published date:{new Date(report.publishedDate).toLocaleDateString()}</h1>
            <h1 className=' px-2'>Added date: {new Date(report.addedDate).toLocaleString()}</h1>
           </div>
          </div>

        )): <>Loading...</>}
       
        

    </div>
  )
}

export default ReportPage