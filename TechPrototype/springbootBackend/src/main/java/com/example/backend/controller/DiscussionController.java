package com.example.backend.controller;

import com.example.backend.domains.Comment;
import com.example.backend.domains.Discussion;
import com.example.backend.serviceImpl.ForumServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {
    @Autowired
    private ForumServiceImpl forumServiceImpl;
    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @GetMapping("/{discussionId}/comments")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable Integer discussionId) {
        List<Comment> comments = forumServiceImpl.getCommentByDiscussion(discussionId);
        return ResponseEntity.ok(comments);
    }
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/{discussionId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Integer discussionId,
                                              @RequestParam Integer userId,
                                              @RequestBody Map<String, String> requestBody) {
        String content = requestBody.get("content");
        Comment comment = forumServiceImpl.addComment(userId, discussionId, content);
        return ResponseEntity.ok(comment);
    }

    @CrossOrigin(origins = "http://localhost:3000" ,allowCredentials="true")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Discussion>> getDiscussionsByUserId(@PathVariable Integer userId) {
        List<Discussion> discussions = forumServiceImpl.getDiscussionsByUserId(userId);
        return ResponseEntity.ok(discussions);
    }
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/{name}")
    public ResponseEntity<List<Discussion>> getDiscussionsByUserName(@PathVariable String name) {
        List<Discussion> discussions = forumServiceImpl.getDiscussionsByUserName(name);
        return ResponseEntity.ok(discussions);
    }
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/create")
    public ResponseEntity<Discussion> createDiscussion(@RequestParam String name,
                                                       @RequestParam String title) {
        Discussion discussion = forumServiceImpl.createDiscussion(name, title);
        return ResponseEntity.ok(discussion);
    }
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/{discussionId}/comments/date")
    public ResponseEntity<List<Comment>> getCommentsByDate(@PathVariable Integer discussionId,
                                                           @RequestParam String date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date parsedDate = formatter.parse(date);
            List<Comment> comments = forumServiceImpl.getCommentsByDate(discussionId, parsedDate);
            return ResponseEntity.ok(comments);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/{discussionId}/comments/date-range")
    public ResponseEntity<List<Comment>> getCommentsByDateRange(@PathVariable Integer discussionId,
                                                                @RequestParam String startDate,
                                                                @RequestParam String endDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date start = formatter.parse(startDate);
            Date end = formatter.parse(endDate);
            List<Comment> comments = forumServiceImpl.getCommentsByDateRange(discussionId, start, end);
            return ResponseEntity.ok(comments);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/{discussionId}/comments/last")
    public ResponseEntity<Date> getLastCommentDateByDiscussion(@PathVariable Integer discussionId) {
        Comment lastComment = forumServiceImpl.getLastCommentByDiscussion(discussionId);
        if (lastComment != null) {
            return ResponseEntity.ok(lastComment.getDate());
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/all")
    public ResponseEntity<List<Discussion>> getAllDiscussions() {
        List<Discussion> discussions = forumServiceImpl.getAllDiscussions();
        return ResponseEntity.ok(discussions);
    }
}
