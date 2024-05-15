package com.example.backend.repository;

import com.example.backend.domains.File;
import com.example.backend.domains.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepo extends JpaRepository<File, Integer> {
    public File findByPath(String path);
}
