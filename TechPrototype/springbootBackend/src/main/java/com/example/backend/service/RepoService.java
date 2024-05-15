package com.example.backend.service;

import com.example.backend.DTOs.CreateRepoDTO;
import com.example.backend.DTOs.FileDTO;
import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.domains.File;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.sql.Blob;
import java.util.List;

public interface RepoService {
    public String fileUpload(HttpServletRequest request);
    public Repo getRepo(GetRepoDTO repoDTO);
    public Boolean createRepo(CreateRepoDTO repoDTO);
    public List<Repo> getAllPublicRepos();
    public List<Repo> getAllByUser(UserDTO userDTO);
    public Folder getFolder(GetRepoDTO getRepoDTO);
    public FileDTO getFile(GetRepoDTO getRepoDTO);
    public void downloadFile(GetRepoDTO getRepoDTO, HttpServletResponse response);
    public Boolean changeStar(GetRepoDTO getRepoDTO);
}
