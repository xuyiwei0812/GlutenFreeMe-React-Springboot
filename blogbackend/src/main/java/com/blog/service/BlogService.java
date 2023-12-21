package com.blog.service;

import com.blog.bean.Blog;
import com.blog.mapper.BlogMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;

@Service
public class BlogService {

    @Resource
    BlogMapper blogMapper;

    public ArrayList<Blog> getAllBlogs(){
        return blogMapper.getAllBlogs();
    }

    public Blog getBlogDetails(Integer blogId){
        return blogMapper.getBlogDetails(blogId);
    }
}
