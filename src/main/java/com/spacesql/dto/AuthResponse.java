package com.spacesql.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Ответ на успешную аутентификацию")
public class AuthResponse {
    
    @Schema(description = "JWT токен для аутентификации", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;
    
    @Schema(description = "Тип токена", example = "Bearer")
    private String tokenType = "Bearer";
    
    @Schema(description = "ID пользователя", example = "1")
    private Long userId;
    
    @Schema(description = "Email пользователя", example = "user@example.com")
    private String email;
}
