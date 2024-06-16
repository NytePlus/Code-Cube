package com.example.backend.service;

import com.example.backend.domains.Comment;
import com.example.backend.domains.Discussion;
import com.example.backend.domains.User;

import java.util.Date;
import java.util.List;

public interface ForumService {
    public List<Comment> getCommentByDiscussion(Integer discussionId);
    public List<Discussion> getDiscussionsByUserId(Integer userId);
    public List<Discussion> getDiscussionsByUserName(String name);
    public Comment addComment(Integer userId, Integer discussionId, String content);
}
