package com.spacesql.service;

import com.spacesql.dto.LessonDto;
import com.spacesql.dto.TaskDto;
import com.spacesql.entity.Lesson;
import com.spacesql.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;

    public List<LessonDto> findAllLessons() {
        return lessonRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public LessonDto findLessonById(Long id) {
        return lessonRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
    }

    public List<LessonDto> findLessonsByTopic(String topic) {
        return lessonRepository.findByTopic(topic).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private LessonDto convertToDto(Lesson lesson) {
        return LessonDto.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .topic(lesson.getTopic())
                .difficulty(lesson.getDifficulty())
                .tasks(lesson.getTasks().stream()
                        .map(task -> TaskDto.builder()
                                .id(task.getId())
                                .title(task.getTitle())
                                .description(task.getDescription())
                                .schemaDefinition(task.getSchemaDefinition())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}