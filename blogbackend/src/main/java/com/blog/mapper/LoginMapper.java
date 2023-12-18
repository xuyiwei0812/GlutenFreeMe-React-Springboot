package com.blog.mapper;

import com.blog.bean.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapper {

    @Select("select * from users where username=#{username} and password=#{password}")
    User login(@Param("username") String username, @Param("password") String password);
}
