package com.example.backend.repository;

import com.example.backend.domains.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Integer> {
    List<Comment> findByDiscussionId(Integer discussionId);

    List<Comment> findByDiscussionIdAndDate(Integer discussion_id, Date date);

    List<Comment> findByDiscussionIdAndDateBetween(Integer discussionId, Date startDate, Date endDate);

    Comment findTopByDiscussionIdOrderByDateDesc(Integer discussionId);
}
