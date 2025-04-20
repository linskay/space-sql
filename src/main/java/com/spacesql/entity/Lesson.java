package com.spacesql.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lesson")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Сущность урока")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Schema(description = "Уникальный идентификатор урока", example = "1")
    private Long id;

    @Column(name = "title", nullable = false)
    @Schema(description = "Название урока", example = "Основы SQL")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    @Schema(description = "Подробное описание урока", example = "Введение в SQL-запросы")
    private String description;

    @Column(name = "topic", nullable = false)
    @Schema(description = "Тема урока", example = "SELECT запросы")
    private String topic;

    @Column(name = "difficulty", nullable = false)
    @Schema(description = "Уровень сложности", example = "Начальный")
    private String difficulty;

    @Column(name = "order_index", nullable = false)
    @Schema(description = "Порядковый номер урока", example = "1")
    private Integer orderIndex;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Schema(description = "Список заданий в уроке")
    private List<Task> tasks = new ArrayList<>();
}