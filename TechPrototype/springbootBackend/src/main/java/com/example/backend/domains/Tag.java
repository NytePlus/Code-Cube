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
@Table(name = "tags")
public class Tag {
    @Id
    @Column(name = "name")
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "repoTagList")
    private List<Repo> tagRepoList;
}
