package com.example.backend.service;

import com.example.backend.DTOs.*;
import com.example.backend.domains.File;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

public interface RepoService {
    public String fileUpload(HttpServletRequest request);
    public Repo getRepo(GetRepoDTO repoDTO);
    public Boolean createRepo(CreateRepoDTO repoDTO);
    public List<Repo> getAllPublicRepos();
    public List<Repo> getAllByUser(String name);
    public Folder getFolder(GetRepoDTO getRepoDTO);
    public FileDTO getFile(GetRepoDTO getRepoDTO);
    public void downloadFile(GetRepoDTO getRepoDTO, HttpServletResponse response);
    public Boolean changeStar(GetRepoDTO getRepoDTO);
    public List<Repo> getRepoByNameDateLabelUser(NameDateLabelUserDTO nameDateLabelUserDTO);
    public ResponseEntity<byte[]> downloadZip(String repo) throws SQLException, IOException;
}
