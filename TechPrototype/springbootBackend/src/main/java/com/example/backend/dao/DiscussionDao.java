package com.example.backend.dao;

import com.example.backend.domains.Discussion;
import com.example.backend.domains.User;
import com.example.backend.repository.DiscussionRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscussionDao {
    @Resource
    DiscussionRepo discussionRepo;

    public Optional<Discussion> findById(Integer discussionId) {
        return discussionRepo.findById(discussionId);
    }

    public List<Discussion> findByInitUser(User user) {
        return discussionRepo.findByInitUser(user);
    }

    public Discussion save(Discussion discussion) {
        return discussionRepo.save(discussion);
    }
}
