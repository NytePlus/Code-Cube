package com.example.backend.repository;

import com.example.backend.domains.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Integer> {
    List<Comment> findByDiscussionId(Integer discussionId);
}
