package com.spacesql.controller;

import com.spacesql.security.SecurityUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@Tag(name = "Тестирование аутентификации", description = "API для проверки работы аутентификации")
@SecurityRequirement(name = "bearerAuth")
public class TestAuthController {

    @GetMapping("/public")
    @Operation(summary = "Публичный эндпоинт", 
               description = "Доступен без аутентификации")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Это публичный эндпоинт, доступный всем");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/private")
    @Operation(summary = "Приватный эндпоинт", 
               description = "Требуется аутентификация")
    public ResponseEntity<Map<String, Object>> privateEndpoint() {
        String currentUser = SecurityUtils.getCurrentUserLogin()
                .orElse("Неизвестный пользователь");
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Это защищенный эндпоинт");
        response.put("currentUser", currentUser);
        response.put("authenticated", true);
        
        return ResponseEntity.ok(response);
    }
}
