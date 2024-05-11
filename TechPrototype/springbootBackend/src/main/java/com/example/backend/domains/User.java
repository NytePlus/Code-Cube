package com.example.backend.domains;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
<<<<<<< HEAD
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
=======
@Table(name = "User")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
>>>>>>> f0c63a2da344ac3ec798dc8404c8124b28ea9f36
    private Integer id;

    @Column(name = "username")
    private String name;

    @Column(name = "avatar")
    private byte[] avatar;

    @JsonIgnore
    @OneToMany(mappedBy = "initUser")
    private List<Repo> initRepositoryList;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Comment> commentList;

    @JsonIgnore
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