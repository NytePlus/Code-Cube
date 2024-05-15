package com.example.backend.dao;

import com.example.backend.domains.File;
import com.example.backend.repository.FileRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class FileDao {
    @Resource
    FileRepo fileRepo;
    public void addFile(File file){
        fileRepo.save(file);
    }
    public File findByPath(String path){
        return fileRepo.findByPath(path);
    }
}
