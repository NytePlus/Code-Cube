package com.example.backend.repository;


import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Discussion extends JpaRepository<Discussion, Integer> {
}
