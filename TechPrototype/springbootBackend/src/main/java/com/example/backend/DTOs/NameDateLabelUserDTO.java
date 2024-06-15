package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class NameDateLabelUserDTO {
    String name, begin, end, user;
    List<String> labels;
}
