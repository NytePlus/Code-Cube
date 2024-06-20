package com.example.backend.controller;

import com.example.backend.domains.Conversation;
import com.example.backend.domains.Message;
import com.example.backend.serviceImpl.MessageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/conversations")
public class MessageController {
    @Autowired
    private MessageServiceImpl messageServiceImpl;

    // 获取特定对话中的所有消息
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/{conversationId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Integer conversationId) {
        List<Message> messages = messageServiceImpl.getMessagesByConversationId(conversationId);
        return ResponseEntity.ok(messages);
    }

    // 在特定对话中发布消息
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/{conversationId}/messages")
    public ResponseEntity<Message> postMessage(@PathVariable Integer conversationId,
                                               @RequestParam Integer userId,
                                               @RequestBody Map<String, String> requestBody) {
        String content = requestBody.get("content");
        Message message = messageServiceImpl.postMessage(userId, conversationId, content);
        return ResponseEntity.ok(message);
    }


    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/userid/{userId}")
    public ResponseEntity<List<Conversation>> getConversationsByUserId(@PathVariable Integer userId) {
        List<Conversation> conversations = messageServiceImpl.getConversationsByUserId(userId);
        return ResponseEntity.ok(conversations);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/user/{name}")
    public ResponseEntity<List<Conversation>> getConversationsByUserName(@PathVariable String name) {
        List<Conversation> conversations = messageServiceImpl.getConversationsByUserName(name);
        return ResponseEntity.ok(conversations);
    }

    // 创建新的对话
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/create")
    public ResponseEntity<Conversation> createConversation(@RequestParam String currentUser,
                                                           @RequestParam String otherUser) {
        Conversation conversation = messageServiceImpl.createConversation(currentUser, otherUser);
        return ResponseEntity.ok(conversation);
    }

    // 获取特定对话的最后一条消息的发布时间
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/{conversationId}/last-message-date")
    public ResponseEntity<String> getLastMessageDateByConversationId(@PathVariable Integer conversationId) {
        Message lastMessage = messageServiceImpl.getLastMessageByConversationId(conversationId);
        if (lastMessage != null) {
            return ResponseEntity.ok(lastMessage.getDate().toString());
        } else {
            return ResponseEntity.noContent().build();
        }
    }
}
