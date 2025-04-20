package com.spacesql.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
@Schema(description = "Сущность пользователя")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Уникальный идентификатор пользователя", example = "1")
    private Long id;

    @Column(unique = true, nullable = false)
    @Schema(description = "Имя пользователя GitHub", example = "octocat")
    private String githubUsername;

    @Schema(description = "URL аватара", example = "https://avatars.githubusercontent.com/u/583231?v=4")
    private String avatarUrl;

    @Schema(description = "Прогресс обучения в баллах", example = "25")
    private int progress;
}