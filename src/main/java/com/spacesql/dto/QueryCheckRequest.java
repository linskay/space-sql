package com.spacesql.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "Запрос на проверку SQL запроса")
public class QueryCheckRequest {
    @NotNull(message = "ID задания обязательно")
    @Schema(description = "ID задания", example = "1")
    private Long taskId;

    @NotBlank(message = "SQL запрос обязателен")
    @Schema(description = "SQL запрос пользователя", example = "SELECT * FROM users")
    private String userQuery;
}