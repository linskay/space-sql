package com.spacesql.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "task")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Сущность задания")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID задания", example = "1")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    @Schema(description = "Урок, к которому относится задание")
    private Lesson lesson;

    @NotBlank
    @Column(nullable = false, length = 255)
    @Schema(description = "Название задания", example = "Простой SELECT")
    private String title;

    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    @Schema(description = "Описание задания", example = "Выведите всех пользователей")
    private String description;

    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    @Schema(description = "SQL схема для задания", example = "CREATE TABLE users(id INT, name VARCHAR);")
    private String schemaDefinition;

    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    @Schema(description = "Решение задания", example = "SELECT * FROM users")
    private String solutionQuery;

    @NotNull
    @PositiveOrZero
    @Column(nullable = false)
    @Schema(description = "Порядковый номер задания", example = "1")
    private Integer orderIndex;

    @OneToOne(mappedBy = "task", cascade = CascadeType.ALL)
    @Schema(description = "Пример данных для задания")
    private TaskExampleData exampleData;
}