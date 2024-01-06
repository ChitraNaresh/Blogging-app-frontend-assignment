import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./index.css"

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState(null);
  const { blogId } = useParams();
  const fetchBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5004/api/blog/get-blog/${blogId}`
      );
      console.log(data, 300);
      setBlogDetails(data);
    } catch (err) {
      console.log(err);
      return toast.error("Something went wrong..");
    }
  };
  useEffect(() => {
    fetchBlogDetails();
  }, []);
  const returnLoading = () => {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  };
  return (
    <section className="details-section">
      {blogDetails === null ? (
        returnLoading()
      ) : (
        <div className="blog-details-card">
          <img src={blogDetails.imageUrl} alt="avatar" className="blog-img" />
          <div className="about-card">
          <h1 className="blog-details-title">{blogDetails.title}</h1>
          <p className="blog-details-para">{blogDetails.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogDetails;
