package com.spacesql.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LessonDto {
    private Long id;
    private String title;
    private String description;
    private String topic;
    private String difficulty;
    private List<TaskDto> tasks;
}