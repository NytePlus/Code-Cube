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
@Table(name = "folders")
public class Folder {
    @Id
    @Column(name = "path")
    private String path;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "folder")
    private List<Folder> folderList;

    @OneToMany(mappedBy = "folder")
    private List<File> fileList;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "parent_path")
    private Folder folder;
}
