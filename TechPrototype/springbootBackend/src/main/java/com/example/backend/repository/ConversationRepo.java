package com.example.backend.repository;

import com.example.backend.domains.Comment;
import com.example.backend.domains.Conversation;
import com.example.backend.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepo extends JpaRepository<Conversation, Integer> {
    @Query("SELECT c FROM Conversation c JOIN c.partUserList u WHERE u.id = :userId")
    List<Conversation> findByUserId(@Param("userId") Integer userId);

    @Query("SELECT c FROM Conversation c JOIN c.partUserList u WHERE u.name = :userName")
    List<Conversation> findByName(@Param("userName") String userName);

    @Query("SELECT c FROM Conversation c JOIN c.partUserList u1 JOIN c.partUserList u2 " +
            "WHERE u1 = :user1 AND u2 = :user2")
    Optional<Conversation> findByUsers(@Param("user1") User user1, @Param("user2") User user2);

}
