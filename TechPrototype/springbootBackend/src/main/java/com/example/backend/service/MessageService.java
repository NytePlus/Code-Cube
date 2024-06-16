package com.example.backend.service;

import com.example.backend.domains.Conversation;
import com.example.backend.domains.Message;
import com.example.backend.domains.User;

import java.util.Date;
import java.util.List;

public interface MessageService {
    public List<Message> getMessagesByConversationId(Integer conversationId);
    public Message postMessage(Integer userId, Integer conversationId, String content);
    public List<Conversation> getConversationsByUserId(Integer userId);
    public List<Conversation> getConversationsByUserName(String name);
}
