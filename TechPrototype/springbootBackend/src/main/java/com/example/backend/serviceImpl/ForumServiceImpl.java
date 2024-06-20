package com.example.backend.serviceImpl;

import com.example.backend.dao.CommentDao;
import com.example.backend.dao.DiscussionDao;
import com.example.backend.dao.UserDao;
import com.example.backend.domains.Comment;
import com.example.backend.domains.Discussion;
import com.example.backend.domains.User;
import com.example.backend.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class ForumServiceImpl implements ForumService {
    @Autowired
    private DiscussionDao discussionDao;
    @Autowired
    private CommentDao commentDao;
    @Autowired
    private UserDao userDao;


    public List<Comment> getCommentByDiscussion(Integer discussionId) {
        return commentDao.findByDiscussionId(discussionId);
    }

    public List<Discussion> getDiscussionsByUserId(Integer userId) {
        User user = userDao.findById(userId).orElse(null);
        return discussionDao.findByInitUser(user);
    }

    public List<Discussion> getDiscussionsByUserName(String name) {
        User user = userDao.getByName(name);
        return discussionDao.findByInitUser(user);
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

    public Discussion createDiscussion(String name, String title) {
        User user = userDao.getByName(name);

        Discussion discussion = new Discussion();
        discussion.setName(title);
        discussion.setInitUser(user);

        return discussionDao.save(discussion);
    }

    public List<Comment> getCommentsByDate(Integer discussionId, Date date) {
        return commentDao.findByDiscussionIdAndDate(discussionId, date);
    }

    public List<Comment> getCommentsByDateRange(Integer discussionId, Date startDate, Date endDate) {
        return commentDao.findByDiscussionIdAndDateBetween(discussionId, startDate, endDate);

    }
}
