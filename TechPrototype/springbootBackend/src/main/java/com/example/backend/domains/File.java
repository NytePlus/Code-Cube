package com.example.backend.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "files")
public class File {
    @Id
    @Column(name = "path")
    private String path;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "size")
    private long size;

    @JsonIgnore
    @Lob()
    @Column(name = "content")
    private Blob content;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "parent_path")
    private Folder folder;
}
