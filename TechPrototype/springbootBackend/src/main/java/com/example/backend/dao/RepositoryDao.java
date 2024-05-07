package com.example.backend.dao;

import com.example.backend.repository.RepoRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class RepositoryDao {
    @Resource
    RepoRepo repoRepo;
}
