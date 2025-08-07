package com.spacesql.config;

import com.spacesql.entity.User;
import com.spacesql.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Check if test user already exists
        if (userRepository.findByEmail("test@example.com").isEmpty()) {
            // Create test user
            User testUser = new User();
            testUser.setEmail("test@example.com");
            testUser.setPassword(passwordEncoder.encode("password123"));
            testUser.setEnabled(true);
            
            userRepository.save(testUser);
            
            System.out.println("Created test user with email: test@example.com and password: password123");
        }
    }
}
