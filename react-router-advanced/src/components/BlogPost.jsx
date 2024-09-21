import React from "react";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Blog Post</h1>
      <p>You are viewing blog post with ID: {id}</p>
    </div>
  );
};

export default Blog;
