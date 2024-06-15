package com.example.backend.controller;

import com.example.backend.domains.Comment;
import com.example.backend.domains.Discussion;
import com.example.backend.service.ForumService;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class DiscussionControllerTest {

    @Mock
    private ForumService forumService;

    @InjectMocks
    private DiscussionController discussionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllComments() {
        List<Comment> comments = new ArrayList<>();
        when(forumService.getCommentByDiscussion(anyInt())).thenReturn(comments);

        ResponseEntity<List<Comment>> response = discussionController.getAllComments(1);

        assertEquals(comments, response.getBody());
        verify(forumService, times(1)).getCommentByDiscussion(1);
    }

    @Test
    void testAddComment() {
        Comment comment = new Comment();
        when(forumService.addComment(anyInt(), anyInt(), anyString())).thenReturn(comment);

        ResponseEntity<Comment> response = discussionController.addComment(1, 1, Map.of("content", "Test content"));

        assertEquals(comment, response.getBody());
        verify(forumService, times(1)).addComment(1, 1, "Test content");
    }

    @Test
    void testGetDiscussionsByUserId() {
        List<Discussion> discussions = new ArrayList<>();
        when(forumService.getDiscussionsByUserId(anyInt())).thenReturn(discussions);

        ResponseEntity<List<Discussion>> response = discussionController.getDiscussionsByUserId(1);

        assertEquals(discussions, response.getBody());
        verify(forumService, times(1)).getDiscussionsByUserId(1);
    }

    @Test
    void testGetDiscussionsByUserName() {
        List<Discussion> discussions = new ArrayList<>();
        when(forumService.getDiscussionsByUserName(anyString())).thenReturn(discussions);

        ResponseEntity<List<Discussion>> response = discussionController.getDiscussionsByUserName("John");

        assertEquals(discussions, response.getBody());
        verify(forumService, times(1)).getDiscussionsByUserName("John");
    }
}
