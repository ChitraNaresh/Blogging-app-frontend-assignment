import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import CreateBlog from "./components/CreateBlog";
import Form from "./components/Form";
import EditBlog from "./components/EditBlog";
import BlogDetails from "./components/BlogDetails";
import SignInandSign from "./components/SignInandSignup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignInandSign type="signup"/>}/>
          <Route path="/signin" element={<SignInandSign type="signin"/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:blogId" element={<EditBlog/>}/>
          <Route path="/blog-details/:blogId" element={<BlogDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
