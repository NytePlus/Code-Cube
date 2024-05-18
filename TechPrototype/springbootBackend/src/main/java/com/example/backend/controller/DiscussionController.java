package com.example.backend.controller;

import com.example.backend.domains.Comment;
import com.example.backend.domains.Discussion;
import com.example.backend.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {
    @Autowired
    private ForumService forumService;
    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @GetMapping("/{discussionId}/comments")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable Integer discussionId) {
        List<Comment> comments = forumService.getCommentByDiscussion(discussionId);
        return ResponseEntity.ok(comments);
    }
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/{discussionId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Integer discussionId,
                                              @RequestParam Integer userId,
                                              @RequestBody Map<String, String> requestBody) {
        String content = requestBody.get("content");
        Comment comment = forumService.addComment(userId, discussionId, content);
        return ResponseEntity.ok(comment);
    }

    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Discussion>> getDiscussionsByUserId(@PathVariable Integer userId) {
        List<Discussion> discussions = forumService.getDiscussionsByUserId(userId);
        return ResponseEntity.ok(discussions);
    }
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/{name}")
    public ResponseEntity<List<Discussion>> getDiscussionsByUserName(@PathVariable String name) {
        List<Discussion> discussions = forumService.getDiscussionsByUserName(name);
        return ResponseEntity.ok(discussions);
    }
}
