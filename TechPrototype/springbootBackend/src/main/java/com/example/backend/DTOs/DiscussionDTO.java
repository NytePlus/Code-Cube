package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class DiscussionDTO {
    private Integer id;
    private String name;
    private Integer userId;

    public DiscussionDTO(Integer id, String name, Integer userId) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }

    // Getter和Setter
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}

