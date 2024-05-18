package com.example.backend.dao;

import com.example.backend.domains.Conversation;
import com.example.backend.repository.ConversationRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationDao {
    @Resource
    ConversationRepo conversationRepo;


}
