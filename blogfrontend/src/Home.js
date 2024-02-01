import BlogList from "./BlogList";
import useFetch from "./useFetch";
import React from 'react';

const Home = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:2887/api/blog/getAllBlogs');

  return (
      <div className="home">
        {error && <div className="error-message">{error}</div>}
        {isPending && <div className="loading-message">Loading...</div>}
        {blogs && <BlogList blogs={blogs.data} />}
      </div>
  );
}
 
export default Home;