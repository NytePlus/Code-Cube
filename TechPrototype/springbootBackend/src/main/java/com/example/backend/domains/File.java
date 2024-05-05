package com.example.backend.domains;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column(name = "content")
    private byte[] content;

    @ManyToOne
    @JoinColumn(name = "parent_path")
    private Folder folder;
}
