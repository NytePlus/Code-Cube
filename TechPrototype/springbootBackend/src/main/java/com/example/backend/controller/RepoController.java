package com.example.backend.controller;

import com.example.backend.DTOs.CreateRepoDTO;
import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import com.example.backend.service.RepoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RepoController {
    @Autowired
    RepoService repoService;

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
    @RequestMapping("/fileUpload")
    public @ResponseBody String fileUploadHandler(HttpServletRequest request) {
        return repoService.fileUpload(request);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
    @RequestMapping("/repoGet")
    public @ResponseBody Repo getRepoHandler(@RequestBody GetRepoDTO getRepoDTO){
        return repoService.getRepo(getRepoDTO);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
    @RequestMapping("/folderGet")
    public @ResponseBody Folder getFolderHandler(@RequestBody GetRepoDTO getRepoDTO){
        return repoService.getFolder(getRepoDTO);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
    @RequestMapping("/repoCreate")
    public @ResponseBody Boolean createRepoHandler(@RequestBody CreateRepoDTO repoDTO){
        return repoService.createRepo(repoDTO);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
    @RequestMapping("/repoGetAll")
    public @ResponseBody List<Repo> getAllPublicRepoHandler(){
        return repoService.getAllPublicRepos();
    }
}
