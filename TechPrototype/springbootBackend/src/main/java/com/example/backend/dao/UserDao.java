package com.example.backend.dao;

import com.example.backend.domains.User;
import com.example.backend.domains.UserAuth;
import com.example.backend.repository.UserAuthRepo;
import com.example.backend.repository.UserRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDao {
    @Resource
    UserRepo userRepo;
    @Resource
    UserAuthRepo userAuthRepo;

    public String getPasswordByName(String name) {
        User user = userRepo.findByName(name);
        UserAuth userAuth = userAuthRepo.findById(Integer.valueOf(user.getId())).orElse(null);
        assert userAuth != null;
        return userAuth.getPassword();
    }

    public User getByName(String name){
        return userRepo.findByName(name);
    }

    public Optional<User> findById(Integer id) { return userRepo.findById(id); }

}
