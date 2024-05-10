package com.example.backend.service;

import com.example.backend.dao.CommentDao;
import com.example.backend.dao.DiscussionDao;
import com.example.backend.dao.UserDao;
import com.example.backend.domains.Comment;
import com.example.backend.domains.Discussion;
import com.example.backend.domains.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ForumService {
    @Autowired
    private DiscussionDao discussionDao;
    @Autowired
    private CommentDao commentDao;
    @Autowired
    private UserDao userDao;

    public List<Comment> getCommentByDiscussion(Integer discussionId) {
        return commentDao.findByDiscussionId(discussionId);
    }

    public Comment addComment(Integer userId, Integer discussionId, String content) {
        User user = userDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Discussion discussion = discussionDao.findById(discussionId).orElseThrow(() -> new RuntimeException("Discussion not found"));
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setDate(new Date());
        comment.setUser(user);
        comment.setDiscussion(discussion);
        return commentDao.save(comment);
    }


}
