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
@Table(name = "discussions")
public class Discussion {
    @Id
    @Column(name = "path")
    private String path;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "init_user")
    private User init_user;

    @OneToMany(mappedBy = "discussion")
    private List<Comment> commentList;

    @ManyToMany(mappedBy = "partDiscussionList")
    private List<User> partUserList;
}
