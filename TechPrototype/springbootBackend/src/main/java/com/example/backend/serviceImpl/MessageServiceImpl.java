package com.example.backend.serviceImpl;

import com.example.backend.domains.Conversation;
import com.example.backend.domains.Message;
import com.example.backend.domains.User;
import com.example.backend.repository.ConversationRepo;
import com.example.backend.repository.MessageRepo;
import com.example.backend.repository.UserRepo;
import com.example.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ConversationRepo conversationRepo;

    public List<Message> getMessagesByConversationId(Integer conversationId) {
        return messageRepo.findByConversationId(conversationId);
    }

    public Message postMessage(Integer userId, Integer conversationId, String content) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Conversation conversation = conversationRepo.findById(conversationId).orElseThrow(() -> new RuntimeException("Conversation not found"));

        Message message = new Message();
        message.setContent(content);
        message.setDate(new Date());
        message.setUser(user);
        message.setConversation(conversation);

        return messageRepo.save(message);
    }

    public List<Conversation> getConversationsByUserId(Integer userId) {
        return conversationRepo.findByUserId(userId);
    }


    public List<Conversation> getConversationsByUserName(String name) {
        return conversationRepo.findByName(name);
    }

    public Conversation createConversation(String currentUserName, String otherUserName) {
        User currentUser = userRepo.findByName(currentUserName);
        User otherUser = userRepo.findByName(otherUserName);

        Optional<Conversation> existingConversation = conversationRepo.findByUsers(currentUser, otherUser);

        if (existingConversation.isPresent())
            return existingConversation.get();
        List<User> partUserList = Arrays.asList(currentUser, otherUser);
        Conversation conversation = new Conversation(partUserList);

        return conversationRepo.save(conversation);
    }
}
