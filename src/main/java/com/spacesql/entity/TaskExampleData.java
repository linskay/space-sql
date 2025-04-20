package com.spacesql.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name = "task_example_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Пример данных для задания")
public class TaskExampleData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Уникальный идентификатор примера", example = "1")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false, unique = true)
    @Schema(description = "Связанное задание")
    private Task task;

    @Column(columnDefinition = "jsonb", nullable = false)
    @JdbcTypeCode(SqlTypes.JSON)
    @Schema(description = "Пример данных в формате JSON", example = "{\"table\": \"users\", \"columns\": [\"id\", \"name\"]}")
    private String exampleData;

    @Column(nullable = false, updatable = false)
    @Schema(description = "Дата создания", example = "2023-07-20T12:00:00")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    @Schema(description = "Дата последнего обновления", example = "2023-07-20T12:00:00")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}