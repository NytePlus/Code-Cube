package com.example.backend.domains;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "conversations")
public class Conversation {
    @Id
    @Column(name = "path")
    private String path;

    @OneToMany(mappedBy = "converation")
    private List<Message> messageList;

    @ManyToMany(mappedBy = "partConversationList")
    private List<User> partUserList;
}
