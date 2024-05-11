package com.example.backend.controller;

import com.example.backend.domains.Message;
import com.example.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class MessageController {
    @Autowired
    private MessageService messageService;

    // 获取特定对话中的所有消息
    @GetMapping("/{conversationId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Integer conversationId) {
        List<Message> messages = messageService.getMessagesByConversationId(conversationId);
        return ResponseEntity.ok(messages);
    }

    // 在特定对话中发布消息
    @PostMapping("/{conversationId}/messages")
    public ResponseEntity<Message> postMessage(@PathVariable Integer conversationId,
                                               @RequestParam Integer userId,
                                               @RequestBody String content) {
        Message message = messageService.postMessage(userId, conversationId, content);
        return ResponseEntity.ok(message);
    }
}
