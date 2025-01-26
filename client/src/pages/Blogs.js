import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  
  // Get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div style={{ backgroundColor: "#1D202A", minHeight: "100vh", padding: "20px" }}>
      {/* Conditional rendering */}
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog?._id}
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h2 style={{ color: "#74D4FF", textAlign: "center", marginTop: "200px" }}>
            There are No Users Present in Your DataBase
            <br></br>
            <h6 style={{color:"red"}}>Blocks cannot be Displayed</h6>
        </h2>
      
      )}
    </div>
  );
};

export default Blogs;
