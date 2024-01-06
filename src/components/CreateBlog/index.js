import React from 'react'
import Form from '../Form'
import "./index.css"
import { Navigate } from 'react-router-dom'

const CreateBlog = () => {
  if (localStorage.getItem("jwt")===null){
    return <Navigate to="/signin" replace={true}/>
  }
  return (
    <section className='create-blog-page'>
    <div className='create-blog-bg'>
        <Form/>
    </div>
    </section>
  )
}

export default CreateBlog