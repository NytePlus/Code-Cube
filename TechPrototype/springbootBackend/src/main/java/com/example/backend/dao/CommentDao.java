package com.example.backend.dao;

import com.example.backend.domains.Comment;
import com.example.backend.repository.CommentRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentDao {
    @Resource
    CommentRepo commentRepo;
    public List<Comment> findByDiscussionId(Integer discussionId) {
        return commentRepo.findByDiscussionId(discussionId);
    }

    public Comment save(Comment comment) {
        // 在这里添加前处理逻辑，例如验证、日志记录等
        if (comment.getContent() == null || comment.getContent().isEmpty()) {
            throw new IllegalArgumentException("Comment content cannot be empty");
        }
        Comment savedComment = commentRepo.save(comment);
        return savedComment;
    }

}
