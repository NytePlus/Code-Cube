package com.example.backend.controller;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {
    @Autowired
    LoginService loginService;

    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @RequestMapping("/login")
    public @ResponseBody boolean checkAccountHandler(@RequestBody UserDTO user){
        return loginService.checkAccount(user);
    }
}
