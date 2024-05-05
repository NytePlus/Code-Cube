package com.example.backend.repository;

import com.example.backend.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.beans.JavaBean;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
}
