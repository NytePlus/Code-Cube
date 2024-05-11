package com.example.backend.dao;

import com.example.backend.domains.Discussion;
import com.example.backend.repository.DiscussionRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DiscussionDao {
    @Resource
    DiscussionRepo discussionRepo;

    public Optional<Discussion> findById(Integer discussionId) {
        return discussionRepo.findById(discussionId);
    }
}
