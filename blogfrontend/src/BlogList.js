import { Link } from 'react-router-dom';
import React from 'react';

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map(blog => (
          //.map()用于遍历数组中的所有元素，并对每个元素执行一个函数。这里的函数是一个箭头函数blog => ( ... )
        <div className="blog-preview" key={blog.blogId} >
          <Link to={`/blogs/${blog.blogId}`}>
            <h2>{ blog.title }</h2>
            <p>Written by { blog.author }</p>
            {console.log(blogs)}
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default BlogList;