package com.example.backend.serviceImpl;

import com.example.backend.domains.Comment;
import com.example.backend.domains.Discussion;
import com.example.backend.service.ForumService;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class ForumServiceImplTest {

    @MockBean
    private ForumServiceImpl forumService;

    private final Integer discussionId = 1;
    private final Integer userId = 100;
    private final String content = "This is a comment";
    private final String userName = "TestUser";

    @Test
    void getCommentByDiscussion() {
        List<Comment> expectedComments = new ArrayList<>();
        when(forumService.getCommentByDiscussion(discussionId)).thenReturn(expectedComments);
        List<Comment> actualComments = forumService.getCommentByDiscussion(discussionId);

        assertNotNull(actualComments);
        assertEquals(expectedComments.size(), actualComments.size());
    }

    @Test
    void getDiscussionsByUserId() {
        List<Discussion> expectedDiscussions = new ArrayList<>();
        when(forumService.getDiscussionsByUserId(userId)).thenReturn(expectedDiscussions);
        List<Discussion> actualDiscussions = forumService.getDiscussionsByUserId(userId);

        assertNotNull(actualDiscussions);
        assertEquals(expectedDiscussions.size(), actualDiscussions.size());
    }

    @Test
    void getDiscussionsByUserName() {
        List<Discussion> expectedDiscussions = new ArrayList<>();
        when(forumService.getDiscussionsByUserName(userName)).thenReturn(expectedDiscussions);
        List<Discussion> actualDiscussions = forumService.getDiscussionsByUserName(userName);

        assertNotNull(actualDiscussions);
        assertEquals(expectedDiscussions.size(), actualDiscussions.size());
    }

    @Test
    void addComment() {
        Comment expectedComment = new Comment(1, "hhh", 1, null, null, null, null, null);
        when(forumService.addComment("wcc", discussionId, content)).thenReturn(expectedComment);

        Comment actualComment = forumService.addComment("wcc", discussionId, content);
        assertNotNull(actualComment);
        verify(forumService, times(1)).addComment("wcc", discussionId, content);
    }
}