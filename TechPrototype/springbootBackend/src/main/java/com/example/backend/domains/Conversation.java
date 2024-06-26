package com.example.backend.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "conversations")
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @JsonIgnore
    @OneToMany(mappedBy = "conversation")
    private List<Message> messageList;

    @ManyToMany(mappedBy = "partConversationList")
    private List<User> partUserList;

    public Conversation(List<User> partUserList) {
        this.partUserList = partUserList;
    }
}
