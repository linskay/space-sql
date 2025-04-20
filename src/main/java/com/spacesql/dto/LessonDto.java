package com.spacesql.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO урока")
public class LessonDto {
    @Schema(description = "ID урока", example = "1")
    private Long id;

    @NotBlank(message = "Название урока обязательно")
    @Schema(description = "Название урока", example = "Основы SQL")
    private String title;

    @NotBlank(message = "Описание урока обязательно")
    @Schema(description = "Описание урока", example = "Введение в SQL запросы")
    private String description;

    @NotBlank(message = "Тема урока обязательна")
    @Schema(description = "Тема урока", example = "SELECT запросы")
    private String topic;

    @NotBlank(message = "Уровень сложности обязателен")
    @Schema(description = "Уровень сложности", example = "Начальный")
    private String difficulty;

    @NotNull(message = "Порядковый индекс обязателен")
    @PositiveOrZero(message = "Порядковый индекс должен быть положительным числом")
    @Schema(description = "Порядковый номер урока", example = "1")
    private Integer orderIndex;

    @Schema(description = "Список заданий урока")
    private List<TaskDto> tasks;
}