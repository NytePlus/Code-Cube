package com.example.backend.repository;

import com.example.backend.domains.File;
import com.example.backend.domains.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepo extends JpaRepository<File, Integer> {
    public File findByPath(String path);
    @Query("select f FROM File f where f.path like ?1%")
    public List<File> findByPref(String prefix);
}
