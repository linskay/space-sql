package com.spacesql.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO задания")
public class TaskDto {
    @Schema(description = "ID задания", example = "1")
    private Long id;

    @NotBlank(message = "Название задания обязательно")
    @Schema(description = "Название задания", example = "Простой SELECT")
    private String title;

    @NotBlank(message = "Описание задания обязательно")
    @Schema(description = "Описание задания", example = "Выведите всех пользователей")
    private String description;

    @NotBlank(message = "Определение схемы обязательно")
    @Schema(description = "SQL схема для задания", example = "CREATE TABLE users(id INT, name VARCHAR);")
    private String schemaDefinition;

    @NotNull(message = "Порядковый индекс обязателен")
    @PositiveOrZero(message = "Порядковый индекс должен быть положительным числом")
    @Schema(description = "Порядковый номер задания", example = "1")
    private Integer orderIndex;
}