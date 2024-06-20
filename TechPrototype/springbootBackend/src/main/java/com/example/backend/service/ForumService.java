package com.example.backend.service;

import com.example.backend.domains.Comment;
import com.example.backend.domains.Discussion;
import com.example.backend.domains.User;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ForumService {
    public List<Comment> getCommentByDiscussion(Integer discussionId);
    public List<Discussion> getDiscussionsByUserId(Integer userId);
    public List<Discussion> getDiscussionsByUserName(String name);
    public Comment addComment(Integer userId, Integer discussionId, String content);

    public Discussion createDiscussion(String name, String title);

    public List<Comment> getCommentsByDate(Integer discussionId, Date date);
    public List<Comment> getCommentsByDateRange(Integer discussionId, Date startDate, Date endDate);
}
