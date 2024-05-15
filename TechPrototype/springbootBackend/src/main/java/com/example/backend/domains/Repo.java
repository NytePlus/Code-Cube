package com.example.backend.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "star")
    private Integer star;

    @Column(name = "publish")
    private boolean publish;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "folder")
    private Folder folder;

    @ManyToOne
    @JoinColumn(name = "init_user")
    private User initUser;

    @JsonIgnore
    @ManyToMany(mappedBy = "starRepositoryList")
    private List<User> starUsers;

    @ManyToMany
    @JoinTable(name = "repo_tags",
            joinColumns = @JoinColumn(name = "repo"),
            inverseJoinColumns = @JoinColumn(name = "tag"))
    private List<Tag> repoTagList;
}
