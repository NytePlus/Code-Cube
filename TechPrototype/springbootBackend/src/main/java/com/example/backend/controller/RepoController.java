package com.example.backend.controller;

import com.example.backend.DTOs.*;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import com.example.backend.service.RepoService;
import com.example.backend.utils.SessionUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
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
    @RequestMapping("/fileGet")
    public @ResponseBody ResponseEntity<FileDTO> getFileHandler(@RequestBody GetRepoDTO getRepoDTO){
        return new ResponseEntity<>(repoService.getFile(getRepoDTO), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
    @RequestMapping("/fileDownload")
    public void downloadFileHandler(@RequestBody GetRepoDTO getRepoDTO, HttpServletResponse response){
        repoService.downloadFile(getRepoDTO, response);
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

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
    @RequestMapping("/repoGetByUser")
    public @ResponseBody List<Repo> getAllRepoByUserHandler(@RequestParam String target){
        HttpSession session = SessionUtils.getSession();
        if (session != null) {
            String name = (String) session.getAttribute("userId");
            if(target == name)
                return repoService.getAllByUser(name);
            else return repoService.getRepoByNameDateLabelUser(
                    new NameDateLabelUserDTO("", "2000-01-01", "2030-01-01", target, new ArrayList<>()));
        }
        return new ArrayList<>();
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")
    @RequestMapping("/repoFilter")
    public @ResponseBody List<Repo> getRepoByNameDateLabelUserHandler(@RequestBody NameDateLabelUserDTO nameDateLabelUserDTO){
        HttpSession session = SessionUtils.getSession();
        if (session != null) {
            return repoService.getRepoByNameDateLabelUser(nameDateLabelUserDTO);
        }
        return new ArrayList<>();
    }

    @CrossOrigin(origins = "http://localhoHst:3000", allowCredentials="true")
    @RequestMapping("/repoStar")
    public @ResponseBody Boolean changeStarHandler(@RequestBody GetRepoDTO getRepoDTO){
        return repoService.changeStar(getRepoDTO);
    }

    @CrossOrigin(origins = "http://localhoHst:3000", allowCredentials="true")
    @RequestMapping("/repoDomwload")
    public ResponseEntity<byte[]> downloadRepoHandler(@RequestBody GetRepoDTO getRepoDTO) throws SQLException, IOException {
        HttpSession session = SessionUtils.getSession();
        if (session != null) {
            return repoService.downloadZip(getRepoDTO.getPath());
        }
        return null;
    }
}
