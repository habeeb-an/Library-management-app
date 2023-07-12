import axios from 'axios';
import qs from 'qs'

const axiosInstance = axios.create({
  baseURL: import.meta.process.env.REACT_APP_API_ENDPOINT,
  // Set your API base URL
  timeout: 5000, // Set a default timeout (optional)
  headers: {
    'Content-Type': 'application/json', // Set default headers (optional)
  },
});

export const createBook = (book)=>axiosInstance.post('/books',book)
export const getFilter=(searchParams)=>axiosInstance.get(`/books?${qs.stringify(searchParams)}`)
export const deleteBook=(id)=>axiosInstance.delete(`/books/${id}`)
export const updateSelection=(id,book)=>axiosInstance.put(`/books/${id}`,book)
export const getBooks=(id)=>axiosInstance.get(`/books/${(id)}`)