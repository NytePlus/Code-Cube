package com.example.backend.domains;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "content")
    private String content;

    @Column(name = "likes")
    private Integer likes;

    @Column(name = "date")
    private Date date;


    @OneToMany(mappedBy = "comment")
    private List<Comment> commentList;


    @ManyToOne
    @JoinColumn(name = "user")
    private User user;


    @ManyToOne
    @JoinColumn(name = "parent_comment")
    private Comment comment;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "parent_discussion")
    private Discussion discussion;
}
