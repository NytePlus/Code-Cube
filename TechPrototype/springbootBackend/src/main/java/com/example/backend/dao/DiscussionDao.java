package com.example.backend.dao;

import com.example.backend.repository.DiscussionRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class DiscussionDao {
    @Resource
    DiscussionRepo discussionRepo;
}
