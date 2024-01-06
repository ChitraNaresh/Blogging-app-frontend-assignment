import React, { useEffect, useState } from "react";
import "./index.css";
import BlogPost from "../BlogPost";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try{
      const { data:{message,success} } = await axios.get("http://localhost:5004/api/blog/all-blogs");
      console.log(message)
      setBlogs(message)
    }catch(err){
      console.log(err)
    }
  };
  const returnLoading=()=>{
    return <div>
      <h3>Loading....</h3>
    </div>
  }
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <section className="home-page">
      <h1 className="blogs-home-text">
        Enjoy blogs and create your own blogs...
      </h1>
     {
      blogs.length === 0 ? returnLoading() :  <div className="blogs-container">
      {blogs.map((eachItem) => (
        <BlogPost fetchBlogs={fetchBlogs} key={eachItem._id} blog={eachItem}/>
      ))}
    </div>
     }
    </section>
  );
};

export default Home;
