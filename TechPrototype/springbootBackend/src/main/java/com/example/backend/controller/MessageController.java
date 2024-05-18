package com.example.backend.controller;

import com.example.backend.domains.Conversation;
import com.example.backend.domains.Discussion;
import com.example.backend.domains.Message;
import com.example.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/conversations")
public class MessageController {
    @Autowired
    private MessageService messageService;

    // 获取特定对话中的所有消息
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/{conversationId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Integer conversationId) {
        List<Message> messages = messageService.getMessagesByConversationId(conversationId);
        return ResponseEntity.ok(messages);
    }

    // 在特定对话中发布消息
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/{conversationId}/messages")
    public ResponseEntity<Message> postMessage(@PathVariable Integer conversationId,
                                               @RequestParam Integer userId,
                                               @RequestBody Map<String, String> requestBody) {
        String content = requestBody.get("content");
        Message message = messageService.postMessage(userId, conversationId, content);
        return ResponseEntity.ok(message);
    }


    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/userid/{userId}")
    public ResponseEntity<List<Conversation>> getConversationsByUserId(@PathVariable Integer userId) {
        List<Conversation> conversations = messageService.getConversationsByUserId(userId);
        return ResponseEntity.ok(conversations);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/user/{name}")
    public ResponseEntity<List<Conversation>> getConversationsByUserName(@PathVariable String name) {
        List<Conversation> conversations = messageService.getConversationsByUserName(name);
        return ResponseEntity.ok(conversations);
    }

}
