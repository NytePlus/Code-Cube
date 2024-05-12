package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CreateRepoDTO {
    UserDTO user;
    String path;
    Boolean publish;
    String introduction;
    List<String> tagNameList;
}
