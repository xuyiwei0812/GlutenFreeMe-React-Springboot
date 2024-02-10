package com.blog.mapper;

import com.blog.bean.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LoginMapper {

    //login
    @Select("select * from users where username=#{username} and password=#{password}")
    User login(@Param("username") String username, @Param("password") String password);


    @Options(useGeneratedKeys = true, keyProperty = "userId", keyColumn = "userId")
    @Insert("insert into users (username, password) values(#{username}, #{password})")
    Boolean register(@Param("username") String username, @Param("password") String password);
}
