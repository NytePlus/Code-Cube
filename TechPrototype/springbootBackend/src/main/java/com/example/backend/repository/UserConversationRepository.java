package com.example.backend.repository;

import com.example.backend.domains.UserConversation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserConversationRepository extends JpaRepository<UserConversation, Long> {
}
