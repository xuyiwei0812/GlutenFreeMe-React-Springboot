package com.blog.controller;

import com.blog.bean.Blog;
import com.blog.bean.Response;
import com.blog.service.BlogService;
import com.blog.service.LoginService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)

@RequestMapping("/api/blog")
public class BlogController {


    @Resource
    BlogService blogService;

    @ResponseBody
    @GetMapping("/getAllBlogs")
    public Response<ArrayList<Blog>> getAllBlogs(){
        ArrayList<Blog> blogs = blogService.getAllBlogs();
        if(blogs!=null) {
            System.out.println("all blogs:"+blogs);
            return Response.createSuc(blogs);
        }
        else{
            return Response.createErr("fail");
        }
    }

    @ResponseBody
    @GetMapping("/getBlogDetails/{blogId}")
    public Response<Blog> getBlogDetails(@PathVariable Integer blogId){
        System.out.println("blogId:"+blogId);
        Blog blog = blogService.getBlogDetails(blogId);
        if(blog!=null) {
            System.out.println("blog:"+blog);
            return Response.createSuc(blog);
        }
        else{
            return Response.createErr("fail");
        }
    }
}
