package com.example.backend.dao;

import com.example.backend.repository.FolderRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class FolderDao {
    @Resource
    FolderRepo folderRepo;
}
