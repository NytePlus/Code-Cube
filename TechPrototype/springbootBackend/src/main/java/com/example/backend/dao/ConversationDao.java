package com.example.backend.dao;

import com.example.backend.repository.ConversationRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class ConversationDao {
    @Resource
    ConversationRepo conversationRepo;
}
