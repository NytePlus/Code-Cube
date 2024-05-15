package com.example.backend.controller;
import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @RequestMapping("/login")
    public @ResponseBody boolean checkAccountHandler(@RequestBody UserDTO user){
        return userService.checkAccount(user);
    }

    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @RequestMapping("/signup")
    public @ResponseBody boolean signUpHandler(@RequestBody UserDTO user){
        return userService.signUp(user);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
    @RequestMapping("/repoStarCheck")
    public @ResponseBody Boolean isStarredByUserHandler(@RequestBody GetRepoDTO getRepoDTO){
        return userService.checkStarByPath(getRepoDTO);
    }
}
