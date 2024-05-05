package com.example.backend.repository;

import com.example.backend.domains.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuthRepo extends JpaRepository<UserAuth, Integer> {
}
