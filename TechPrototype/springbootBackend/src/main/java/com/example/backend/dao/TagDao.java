package com.example.backend.dao;

import com.example.backend.domains.Tag;
import com.example.backend.repository.TagRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TagDao {
    @Resource
    TagRepo tagRepo;

    public Tag findOrCreateByName(String name){
        Tag tag = tagRepo.findByName(name);
        if(tag == null){
            tag = new Tag(name, new ArrayList<>());
            tagRepo.save(tag);
            return tag;
        }
        else return tag;
    }
}
