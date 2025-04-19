package com.spacesql.controller;

import com.spacesql.entity.User;
import com.spacesql.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Управление пользователями", description = "API для работы с пользователями")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Получить текущего пользователя", description = "Возвращает информацию о текущем аутентифицированном пользователе")
    @ApiResponse(responseCode = "200", description = "Информация о пользователе получена",
            content = @Content(schema = @Schema(implementation = User.class)))
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal OAuth2User principal) {
        String githubUsername = principal.getAttribute("login");
        return ResponseEntity.ok(userRepository.findByGithubUsername(githubUsername)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден")));
    }

    @PostMapping(value = "/logout", produces = MediaType.TEXT_PLAIN_VALUE)
    @Operation(summary = "Выход из системы", description = "Завершает сеанс текущего пользователя")
    @ApiResponse(responseCode = "200", description = "Выход выполнен успешно")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Вы успешно вышли из системы");
    }
}