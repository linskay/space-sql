package com.spacesql.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "task")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "schema_definition", columnDefinition = "TEXT", nullable = false)
    private String schemaDefinition;

    @Column(name = "solution_query", columnDefinition = "TEXT", nullable = false)
    private String solutionQuery;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
}