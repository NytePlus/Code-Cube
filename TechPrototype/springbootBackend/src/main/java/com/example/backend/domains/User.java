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
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private String id;

    @Column(name = "Username")
    private String name;

    @Column(name = "Avatar")
    private byte[] avatar;

    @OneToMany(mappedBy = "initUser")
    private List<Repo> initRepositoryList;

    @OneToMany(mappedBy = "initUser")
    private List<Discussion> initDiscussionList;

    @OneToMany(mappedBy = "user")
    private List<Comment> commentList;

    @OneToMany(mappedBy = "user")
    private List<Message> messageList;

    @ManyToMany
    @JoinTable(name = "user_repositories",
            joinColumns = @JoinColumn(name = "star_user"),
            inverseJoinColumns = @JoinColumn(name = "star_repo"))
    private List<Repo> starRepositoryList;

    @ManyToMany
    @JoinTable(name = "user_discussions",
            joinColumns = @JoinColumn(name = "part_user"),
            inverseJoinColumns = @JoinColumn(name = "part_diss"))
    private List<Discussion> partDiscussionList;

    @ManyToMany
    @JoinTable(name = "user_conversations",
            joinColumns = @JoinColumn(name = "part_user"),
            inverseJoinColumns = @JoinColumn(name = "part_conv"))
    private List<Conversation> partConversationList;
}