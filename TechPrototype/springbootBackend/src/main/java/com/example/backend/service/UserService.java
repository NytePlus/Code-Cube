package com.example.backend.service;

import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.domains.User;
import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
    public boolean checkAccount(UserDTO user);
    public boolean signUp(UserDTO user);
    public Boolean checkStarByPath(GetRepoDTO getRepoDTO);
    public Boolean changeAvatar(HttpServletRequest request, String name);
    public User getProfile(String name);
    public Boolean changeIntroduction(String introduciton, String name);

    public User getUserByName(String name);
}
