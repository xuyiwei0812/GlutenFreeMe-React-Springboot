package com.blog.mapper;

import com.blog.bean.Blog;
import com.blog.bean.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;


@Mapper
public interface BlogMapper {

    //getAllBlogs
    @Select("select * from blog")
    ArrayList<Blog> getAllBlogs();

    //getBlogDetails
    @Select("select * from blog where blogId=#{blogId}")
    Blog getBlogDetails(@Param("blogId") Integer blogId);
}
