package com.example.backend.controller;

import com.example.backend.service.RepoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Enumeration;
import java.util.List;

@RestController
public class RepoController {
    @Autowired
    RepoService repoService;

    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @RequestMapping("/fileUpload")
    public @ResponseBody String fileUploadHandler(HttpServletRequest request) {
        return repoService.fileUpload(request);
    }
}
