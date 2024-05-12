package com.example.backend.service;

import com.example.backend.DTOs.UserDTO;

public interface UserService {
    public boolean checkAccount(UserDTO user);
    public boolean signUp(UserDTO user);
}
