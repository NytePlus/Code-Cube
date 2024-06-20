package com.example.backend.repository;

import com.example.backend.domains.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Integer> {
    List<Message> findByConversationId(Integer conversationId);

    Message findTopByConversationIdOrderByDateDesc(Integer conversationId);
}
