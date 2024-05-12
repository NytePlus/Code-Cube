package com.example.backend.DTOs;

import com.example.backend.domains.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RepoDTO {
    UserDTO user;
    String path;
    Boolean publish;
    String introduction;
    List<String> tagNameList;
}
