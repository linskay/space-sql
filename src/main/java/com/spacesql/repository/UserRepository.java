package com.spacesql.repository;

import com.spacesql.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByGithubUsername(String githubUsername);
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
}