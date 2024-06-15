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

import java.sql.Blob;
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
    private Integer id;

    @Column(name = "username")
    private String name;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "introduction")
    private String introduction;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "user_auth")
    private UserAuth userAuth;

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
    @JsonIgnore
    @JoinTable(name = "user_repositories",
            joinColumns = @JoinColumn(name = "star_user"),
            inverseJoinColumns = @JoinColumn(name = "star_repo"))
    private List<Repo> starRepositoryList;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "user_discussions",
            joinColumns = @JoinColumn(name = "part_user"),
            inverseJoinColumns = @JoinColumn(name = "part_diss"))
    private List<Discussion> partDiscussionList;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "user_conversations",
            joinColumns = @JoinColumn(name = "part_user"),
            inverseJoinColumns = @JoinColumn(name = "part_conv"))
    private List<Conversation> partConversationList;
}