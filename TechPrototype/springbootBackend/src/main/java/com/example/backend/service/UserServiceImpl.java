package com.example.backend.service;

import com.example.backend.DTOs.UserDTO;
import com.example.backend.dao.UserDao;
import com.example.backend.domains.User;
import com.example.backend.domains.UserAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userdao;

    @Override
    public boolean checkAccount(UserDTO user){
        String input = user.getPassword();
        String password = userdao.getPasswordByName(user.getName());
        if(password == null) return false;
        System.out.println(input + "\n" + password);
        return Objects.equals(input, password);
    }

    @Override
    public boolean signUp(UserDTO userDTO){
        if(userdao.getByName(userDTO.getName()) != null)
            return false;
        else{
            UserAuth userAuth = new UserAuth(null, userDTO.getPassword());
            User user = new User(null, userDTO.getName(), null, userAuth,
                    new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                    new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
            userdao.addUser(user, userAuth);
            return true;
        }
    }
}
