package com.example.backend.dao;

import com.example.backend.repository.MessageRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class MessageDao {
    @Resource
    MessageRepo messageRepo;
}
