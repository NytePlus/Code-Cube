package com.example.backend.service;

import com.example.backend.DTOs.RepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.domains.Repo;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface RepoService {
    public String fileUpload(HttpServletRequest request);
    public Repo getRepo(RepoDTO repoDTO);
    public Boolean createRepo(RepoDTO repoDTO);
    public List<Repo> getAllPublicRepos();
    public List<Repo> getAllByUser(UserDTO userDTO);
}
