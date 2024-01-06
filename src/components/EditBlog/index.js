import React, { useEffect, useState } from 'react'
import Form from '../Form'
import "./index.css"
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const EditBlog = () => {
    const [editBlog,setEditBlog]=useState(null)
    const {blogId}=useParams()
    const fetchBlogData=async()=>{
        try{
            const {data}=await axios.get(`http://localhost:5004/api/blog/get-blog/${blogId}`);
            console.log(data,100)
            setEditBlog(data)
        }catch(err){
            console.log(err)
            return toast.error("Something went wrong..")
            
          }
    }
    useEffect(()=>{
       fetchBlogData()
    },[])
    const returnLoading=()=>{
        return <div>
            <h3>Loading..</h3>
        </div>
    }
    if (localStorage.getItem("jwt")==null){
        return <Navigate to="/signin" replace={true}/>
      }
  return (
    <div className='edit-blog-card'> 
        {
           editBlog ===null ? returnLoading() : <Form editBlog={editBlog}/> 
        }
    </div>
  )
}

export default EditBlog