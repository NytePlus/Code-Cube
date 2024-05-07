package com.example.backend.service;

import com.example.backend.DTOs.UserDTO;

public interface LoginService {
    public boolean checkAccount(UserDTO user);
}
