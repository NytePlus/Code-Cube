package com.example.backend.controller;

import com.example.backend.domains.Conversation;
import com.example.backend.domains.Message;
import com.example.backend.service.MessageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class MessageControllerTest {

    @Mock
    private MessageService messageService;

    @InjectMocks
    private MessageController messageController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetMessages() {
        List<Message> messages = new ArrayList<>();
        when(messageService.getMessagesByConversationId(anyInt())).thenReturn(messages);

        ResponseEntity<List<Message>> response = messageController.getMessages(1);

        assertEquals(messages, response.getBody());
        verify(messageService, times(1)).getMessagesByConversationId(1);
    }

    @Test
    void testPostMessage() {
        Message message = new Message();
        when(messageService.postMessage(anyInt(), anyInt(), anyString())).thenReturn(message);

        ResponseEntity<Message> response = messageController.postMessage(1, 1, Map.of("content", "Test content"));

        assertEquals(message, response.getBody());
        verify(messageService, times(1)).postMessage(1, 1, "Test content");
    }

    @Test
    void testGetConversationsByUserId() {
        List<Conversation> conversations = new ArrayList<>();
        when(messageService.getConversationsByUserId(anyInt())).thenReturn(conversations);

        ResponseEntity<List<Conversation>> response = messageController.getConversationsByUserId(1);

        assertEquals(conversations, response.getBody());
        verify(messageService, times(1)).getConversationsByUserId(1);
    }

    @Test
    void testGetConversationsByUserName() {
        List<Conversation> conversations = new ArrayList<>();
        when(messageService.getConversationsByUserName(anyString())).thenReturn(conversations);

        ResponseEntity<List<Conversation>> response = messageController.getConversationsByUserName("John");

        assertEquals(conversations, response.getBody());
        verify(messageService, times(1)).getConversationsByUserName("John");
    }
}
