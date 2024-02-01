import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import React from 'react';

const BlogDetails = () => {
    const { id } = useParams();
    const { data: response, error, isPending } = useFetch('http://localhost:2887/api/blog/getBlogDetails/' + id);

    // 从 response 中提取博客数据
    const blog = response ? response.data : null;

    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div> 
                </article>
            )}
        </div>
    );
}

export default BlogDetails;
