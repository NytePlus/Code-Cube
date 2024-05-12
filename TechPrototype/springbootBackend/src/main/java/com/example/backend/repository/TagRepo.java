package com.example.backend.repository;

import com.example.backend.domains.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;

@Repository
public interface TagRepo extends JpaRepository<Tag, Integer> {
    public Tag findByName(String name);
}
