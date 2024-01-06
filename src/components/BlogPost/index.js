import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./index.css"
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const BlogPost = (props) => {
  const navigate=useNavigate()
  const {blog:{imageUrl,title,description,_id},fetchBlogs}=props
  const handleDelete=async()=>{
    if (localStorage.getItem("jwt")===null){
      return navigate("/signin")
    }
    try{
      await axios.delete(`http://localhost:5004/api/blog/delete-blog/${_id}`);
      fetchBlogs()
      return toast.success("Blog deleted successsfully..")
    }catch(err){
      console.log(err)
      return toast.error("Something went wrong..")
    }
  }
  return (
    <div className="blog-post">
    <Link className="link-el" to={`blog-details/${_id}`}>
      <h1 className="blog-title">{title}</h1>
      <p className="blog-text">
        {description.length > 50 ? `${description.slice(0,50)}...`:description}
      </p>
    </Link>
    <div className="blog-icons-card">
    <Link to={`/edit/${_id}`}>
  <button className="blog-icon-btn">
    <FaEdit />
    </button>
    </Link>
    <button className="blog-icon-btn" onClick={handleDelete}>
     <MdDelete />
     </button>
  </div>
  </div>
  );
};

export default BlogPost;
