import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { imgDB } from "../../common/firebaseConfig";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import { toast, Toaster } from "react-hot-toast";
import "./index.css";
import axios from "axios";

const Form = ({editBlog=undefined}) => {
  const {blogId}=useParams()
  console.log(editBlog,200)
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  } );
  useEffect(()=>{
     if (editBlog){
      const {imageUrl,title,description}=editBlog
      setBlogData({imageUrl,title,description})
     }
  },[])
  const navigate=useNavigate()
  const handleInput = async (e) => {
    let inputValue = e.target.value;
    const type = e.target.name;
    if (type === "imageUrl") {
      const file = e.target.files[0];
      try {
        const imageUrl = await uploadImage(file);
        inputValue = imageUrl;
        toast.success("Image uploaded succesfully..");
        console.log(inputValue);
      } catch (error) {
        console.log(error.messages);
        return toast.error("Upload image correctly..");
      }
    }
    setBlogData({ ...blogData, [type]: inputValue });
  };

  const uploadImage = async (file) => {
    const storageRef = ref(imgDB, "images/" + file.name);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handlePublish = async(e) => {
    e.preventDefault();
    const { title, description, imageUrl } = blogData;
    if (title.length <= 3) {
      return toast.error("Title characters should be more than 3");
    }
    if (description.length <= 3) {
      return toast.error("Description characters should be more than 3");
    }
    if (imageUrl === "") {
      return toast.error("You must provide image...");
    }

    try{
      if (editBlog!==undefined){
        await axios.put(`http://localhost:5004/api/blog/update-blog/${blogId}`,blogData);
        toast.success("Blog updated successfully..")
        return navigate("/")
      }
      await axios.post("http://localhost:5004/api/blog/create-blog",blogData);
      toast.success("Blog created successfully..")
      navigate("/")
    }catch(err){
      return toast.error("Something went wrong..")
      console.log(err)
    }
  };
  console.log(blogData);
  return (
    <>
      <Toaster />
      <div className="form-component">
        <form className="form-component" onSubmit={handlePublish}>
          <div className="input-card">
            <label>
              <div className="default-blog-label">BLOG</div>
              <input
                name="imageUrl"
                hidden
                onChange={handleInput}
                type="file"
                accept="image/png, image/jpeg"
              />
            </label>
          </div>
          <div className="input-card">
            <label className="label">Title</label>
            <input
              onChange={handleInput}
              name="title"
              placeholder="Title..."
              type="text"
              className="title-input"
              value={blogData.title}
            />
          </div>
          <div className="input-card">
            <label className="label">Description</label>
            <textarea
              onChange={handleInput}
              name="description"
              placeholder="Description"
              rows={5}
              className="para-input"
              value={blogData.description}
            />
          </div>
          <button className="publish-btn" type="submit">
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
