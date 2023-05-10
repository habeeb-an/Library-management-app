import React from 'react'
import { Link } from 'react-router-dom'

function ReportPage() {
  return (
    <div>
        <div className='flex justify-between items-center py-4  mx-8'>
            <h1 className='font-bold text-center  '>Report Page</h1>
            <div className='bg-blue-600 text-white items-center justify-center text-center flex-none'>
                <Link to={'/bookpage'} className='mx-auto my-auto px-2 py-2 font-semibold'>Add Book</Link>
             </div>
        </div>
        <div className='font-serif font-medium bg-gray-200 rounded-lg mx-8 my-4 py-2'>
         <div  className=' px-2'>
          <h1 className='py-1 px-2'>Bookname:</h1>
          <h1 className='py-1 px-2'>Author:</h1>
          <h1 className='py-1 px-2'>No of copies:</h1>
          <h1 className='py-1 px-2'>published date:</h1>
          <h1 className=' px-2'>Added date:</h1>
         </div>
        </div>
        

    </div>
  )
}

export default ReportPage