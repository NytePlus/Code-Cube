package com.example.backend.serviceImpl;

import com.example.backend.domains.Conversation;
import com.example.backend.domains.Message;
import com.example.backend.domains.User;
import com.example.backend.domains.UserConversation;
import com.example.backend.repository.ConversationRepo;
import com.example.backend.repository.MessageRepo;
import com.example.backend.repository.UserConversationRepository;
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
    private UserConversationRepository userConversationRepo;

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
        User user1 = userRepo.findByName(currentUserName);
        User user2 = userRepo.findByName(otherUserName);



        Conversation conversation = new Conversation();
        conversation.setPartUserList(Arrays.asList(user1, user2));
        conversation = conversationRepo.save(conversation);

        user1.getPartConversationList().add(conversation);
        user2.getPartConversationList().add(conversation);
        userRepo.save(user1);
        userRepo.save(user2);

        return conversation;

    }



    public Message getLastMessageByConversationId(Integer conversationId) {
        return messageRepo.findTopByConversationIdOrderByDateDesc(conversationId);
    }
}
