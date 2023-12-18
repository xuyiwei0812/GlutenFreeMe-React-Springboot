package com.blog.controller;

import com.blog.bean.Response;
import com.blog.bean.User;
import com.blog.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)

@RequestMapping("/api/front")
public class LoginController {

    @Resource
    LoginService loginService;

    @ResponseBody
    @PostMapping("/login")
    public Response<Integer> login(@RequestBody User user){
        System.out.println("1"+user.getUsername());
        if(loginService.login(user)==true) {
            System.out.println("login success");
            return Response.createSuc(user.getUserId());
        }
        else {
            System.out.println("login failed");
            return Response.createErr("fail");
        }
    }

}
