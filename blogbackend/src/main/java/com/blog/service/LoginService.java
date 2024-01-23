package com.blog.service;

import com.blog.bean.User;
import com.blog.mapper.LoginMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class LoginService {

    @Resource
    LoginMapper loginMapper;

    public Boolean login(User user){
        if(loginMapper.login(user.getUsername(),user.getPassword())==null) return false;
        else return true;
    }

    public Boolean register(User user){
        return loginMapper.register(user.getUsername(),user.getPassword());
    }
}
