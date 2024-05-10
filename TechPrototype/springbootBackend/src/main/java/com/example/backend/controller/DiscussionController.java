package com.example.backend.controller;

import com.example.backend.domains.Comment;
import com.example.backend.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {
    @Autowired
    private ForumService forumService;

    @GetMapping("/{discussionId}/comments")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable Integer discussionId) {
        List<Comment> comments = forumService.getCommentByDiscussion(discussionId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/{discussionId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Integer discussionId,
                                              @RequestParam Integer userId,
                                              @RequestBody String content) {
        Comment comment = forumService.addComment(userId, discussionId, content);
        return ResponseEntity.ok(comment);
    }
}
