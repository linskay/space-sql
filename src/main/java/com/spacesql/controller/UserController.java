package com.spacesql.controller;

import com.spacesql.entity.User;
import com.spacesql.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @PostMapping("/auth/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextHolder.clearContext();
        request.getSession().invalidate();
    }

    @PostMapping("/users/login")
    public User login(@RequestBody Map<String, Object> payload) {
        String githubUsername = (String) payload.get("githubUsername");
        String avatarUrl = (String) payload.get("avatarUrl");

        if (githubUsername == null || githubUsername.isEmpty()) {
            throw new IllegalArgumentException("Имя пользователя GitHub не может быть пустым");
        }

        return userRepository.findByGithubUsername(githubUsername)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setGithubUsername(githubUsername);
                    newUser.setAvatarUrl(avatarUrl);
                    newUser.setProgress(0); // Начальный прогресс
                    return userRepository.save(newUser);
                });
    }

    @GetMapping("/users/me")
    public User getCurrentUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            throw new RuntimeException("Пользователь не аутентифицирован");
        }

        String githubUsername = principal.getAttribute("login");
        String avatarUrl = principal.getAttribute("avatar_url");

        return userRepository.findByGithubUsername(githubUsername)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setGithubUsername(githubUsername);
                    newUser.setAvatarUrl(avatarUrl);
                    newUser.setProgress(0);
                    return userRepository.save(newUser);
                });
    }
}