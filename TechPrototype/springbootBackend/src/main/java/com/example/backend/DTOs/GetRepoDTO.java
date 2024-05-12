package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetRepoDTO {
    UserDTO userDTO;
    String path;
}
