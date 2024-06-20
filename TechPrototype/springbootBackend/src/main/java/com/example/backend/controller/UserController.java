package com.example.backend.controller;
import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.domains.User;
import com.example.backend.service.UserService;
import com.example.backend.utils.SessionUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    UserService userService;

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

    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @RequestMapping("/login")
    public Boolean loginHandler(@RequestBody UserDTO user){
        if(userService.checkAccount(user))
        {
            HttpSession session = SessionUtils.getSession();
            if (session != null) {
                session.setAttribute("userId", user.getName());
            }
            return true;
        }
        else return false;
    }

    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @RequestMapping("/avatar")
    public Boolean changeAvatarHandler(HttpServletRequest request){
        HttpSession session = SessionUtils.getSession();
        if (session != null) {
            String name = (String) session.getAttribute("userId");
            userService.changeAvatar(request, name);
            return true;
        }
        return false;
    }

    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @RequestMapping("/user")
    public @ResponseBody User getProfileHandler(@RequestParam String name){
        HttpSession session = SessionUtils.getSession();
        if (session != null) {
            return userService.getProfile(name);
        }
        return null;
    }

    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @RequestMapping("/introduction")
    public Boolean changeIntroductionHandler(@RequestParam String introduction){
        HttpSession session = SessionUtils.getSession();
        if (session != null) {
            String name = (String) session.getAttribute("userId");
            return userService.changeIntroduction(introduction, name);
        }
        return false;
    }
    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @GetMapping("/name/{name}")
    public ResponseEntity<User> getUserByName(@PathVariable String name) {
        User user = userService.getUserByName(name);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
