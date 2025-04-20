package com.spacesql.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Ответ на проверку SQL запроса")
public class QueryCheckResponse {
    @Schema(description = "Флаг корректности запроса", example = "true")
    private boolean isCorrect;

    @Schema(description = "Обратная связь по запросу", example = "Запрос выполнен правильно")
    private String feedback;

    @Schema(description = "Ожидаемый SQL запрос", example = "SELECT id, name FROM users")
    private String expectedQuery;
}