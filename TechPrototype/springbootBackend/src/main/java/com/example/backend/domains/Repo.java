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
@Table(name = "repositories")
public class Repo {
    @Id
    @Column(name = "path")
    private String path;

    @Column(name = "name")
    private String name;

    @Column(name = "readme")
    private String readme;

    @Column(name = "star")
    private Integer star;

    @Column(name = "publish")
    private boolean publish;

    @OneToOne
    @JoinColumn(name = "folder")
    private Folder folder;

    @ManyToOne
    @JoinColumn(name = "init_user")
    private User initUser;

    @ManyToMany(mappedBy = "starRepositoryList")
    private List<User> starUsers;
}
