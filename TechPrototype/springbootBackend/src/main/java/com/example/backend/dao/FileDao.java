package com.example.backend.dao;

import com.example.backend.repository.FileRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class FileDao {
    @Resource
    FileRepo fileRepo;
}
