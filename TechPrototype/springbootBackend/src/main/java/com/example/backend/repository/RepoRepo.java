package com.example.backend.repository;

import com.example.backend.domains.Repo;
import com.example.backend.domains.Tag;
import com.example.backend.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepoRepo extends JpaRepository<Repo, Integer> {
    public Repo findByPath(String path);
    public List<Repo> findAllByPublish(Boolean publish);
    public List<Repo> findAllByInitUser(User user);
    @Query("select r FROM Repo r where r.initUser.name like %?1% and r.name like %?2% and r.date between ?3 and ?4 and r.publish=true")
    public List<Repo> findByUserNameDate(String user, String name, String begin, String end);
}
