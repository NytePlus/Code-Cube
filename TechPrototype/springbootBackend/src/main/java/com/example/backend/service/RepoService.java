package com.example.backend.service;

import com.example.backend.DTOs.CreateRepoDTO;
import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface RepoService {
    public String fileUpload(HttpServletRequest request);
    public Repo getRepo(GetRepoDTO repoDTO);
    public Boolean createRepo(CreateRepoDTO repoDTO);
    public List<Repo> getAllPublicRepos();
    public List<Repo> getAllByUser(UserDTO userDTO);
    public Folder getFolder(GetRepoDTO getRepoDTO);
}
