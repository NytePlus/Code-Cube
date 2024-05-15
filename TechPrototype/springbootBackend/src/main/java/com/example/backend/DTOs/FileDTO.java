package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileDTO {
    private String type;
    private String name;
    private String path;
    private String content;
}
