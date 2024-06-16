package com.example.backend.serviceImpl;

import com.example.backend.domains.Conversation;
import com.example.backend.domains.Message;
import com.example.backend.service.MessageService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@RunWith(SpringRunner.class)
class MessageServiceImplTest {
    @MockBean
    private MessageService mockMessageService;

    @MockBean
    private MessageServiceImpl messageService;

    private final Integer conversationId = 1;
    private final Integer userId = 100;
    private final String content = "Hello, World!";
    private final String userName = "TestUser";

    @Test
    void getMessagesByConversationId() {
        List<Message> expectedMessages = new ArrayList<>();

        when(mockMessageService.getMessagesByConversationId(conversationId)).thenReturn(expectedMessages);
        List<Message> actualMessages = messageService.getMessagesByConversationId(conversationId);

        assertNotNull(actualMessages);
        assertEquals(expectedMessages.size(), actualMessages.size());
    }

    @Test
    void postMessage() {
        Message expectedMessage = new Message();
        when(messageService.postMessage(userId, conversationId, content)).thenReturn(expectedMessage);
        Message actualMessage = messageService.postMessage(userId, conversationId, content);

        assertNotNull(actualMessage);
    }

    @Test
    void getConversationsByUserId() {
        List<Conversation> expectedConversations = new ArrayList<>();

        when(mockMessageService.getConversationsByUserId(userId)).thenReturn(expectedConversations);
        List<Conversation> actualConversations = messageService.getConversationsByUserId(userId);

        assertNotNull(actualConversations);
        assertEquals(expectedConversations.size(), actualConversations.size());
    }

    @Test
    void getConversationsByUserName() {
        List<Conversation> expectedConversations = Collections.singletonList(new Conversation());
        when(messageService.getConversationsByUserName(userName)).thenReturn(expectedConversations);
        List<Conversation> actualConversations = messageService.getConversationsByUserName(userName);

        assertNotNull(actualConversations);
        assertEquals(expectedConversations.size(), actualConversations.size());
    }
}