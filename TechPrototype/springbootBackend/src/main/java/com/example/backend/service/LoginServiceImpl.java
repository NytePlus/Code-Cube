package com.example.backend.service;

import com.example.backend.DTOs.UserDTO;
import com.example.backend.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class LoginServiceImpl implements LoginService{
    @Autowired
    UserDao userdao;

    @Override
    public boolean checkAccount(UserDTO user){
        String input = user.getPassword();
        String password = userdao.getPasswordByName(user.getName());
        System.out.println(input + "\n" + password);
        return Objects.equals(input, password);
    }
}
