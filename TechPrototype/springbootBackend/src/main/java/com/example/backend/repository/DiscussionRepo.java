package com.example.backend.repository;


import com.example.backend.domains.Discussion;
import com.example.backend.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussionRepo extends JpaRepository<Discussion, Integer> {
    List<Discussion> findByInitUser(User initUser);
}
