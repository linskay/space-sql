package com.spacesql.service;

import com.spacesql.dto.LessonDto;
import com.spacesql.dto.TaskDto;
import com.spacesql.entity.Lesson;
import com.spacesql.entity.Task;
import com.spacesql.exception.ResourceNotFoundException;
import com.spacesql.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;

    public List<LessonDto> findAllLessons() {
        return lessonRepository.findAllOrdered().stream()
                .map(this::convertToDtoWithoutTasks)
                .collect(Collectors.toList());
    }

    public LessonDto findLessonById(Long id) {
        Lesson lesson = lessonRepository.findByIdWithTasks(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));
        return convertToDto(lesson);
    }

    public List<LessonDto> findLessonsByTopic(String topic) {
        return lessonRepository.findByTopicOrdered(topic).stream()
                .map(this::convertToDtoWithoutTasks)
                .collect(Collectors.toList());
    }

    private LessonDto convertToDtoWithoutTasks(Lesson lesson) {
        return LessonDto.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .topic(lesson.getTopic())
                .difficulty(lesson.getDifficulty())
                .orderIndex(lesson.getOrderIndex())
                .tasks(Collections.emptyList())
                .build();
    }

    private LessonDto convertToDto(Lesson lesson) {
        return LessonDto.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .topic(lesson.getTopic())
                .difficulty(lesson.getDifficulty())
                .orderIndex(lesson.getOrderIndex())
                .tasks(convertTasksToDtos(lesson.getTasks()))
                .build();
    }

    private List<TaskDto> convertTasksToDtos(List<Task> tasks) {
        return tasks.stream()
                .sorted(Comparator.comparing(Task::getOrderIndex))
                .map(this::convertTaskToDto)
                .collect(Collectors.toList());
    }

    private TaskDto convertTaskToDto(Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .schemaDefinition(task.getSchemaDefinition())
                .orderIndex(task.getOrderIndex())
                .build();
    }
}