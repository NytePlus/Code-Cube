package com.example.backend.repository;

import com.example.backend.domains.Repo;
import com.example.backend.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepoRepo extends JpaRepository<Repo, Integer> {
    public Repo findByPath(String path);
    public List<Repo> findAllByPublish(Boolean publish);
    public List<Repo> findAllByInitUser(User user);
}
