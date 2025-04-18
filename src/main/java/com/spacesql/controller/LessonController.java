package com.spacesql.controller;

import com.spacesql.dto.LessonDto;
import com.spacesql.dto.TaskDto;
import com.spacesql.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {
    private final LessonService lessonService;

    @GetMapping
    public ResponseEntity<List<LessonDto>> getAllLessons() {
        return ResponseEntity.ok(lessonService.findAllLessons());
    }

    @GetMapping("/{lessonId}/tasks")
    public ResponseEntity<List<TaskDto>> getTasksByLessonId(@PathVariable Long lessonId) {
        List<TaskDto> tasks = lessonService.findLessonById(lessonId).getTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonDto> getLessonById(@PathVariable Long id) {
        return ResponseEntity.ok(lessonService.findLessonById(id));
    }

    @GetMapping("/by-topic/{topic}")
    public ResponseEntity<List<LessonDto>> getLessonsByTopic(@PathVariable String topic) {
        return ResponseEntity.ok(lessonService.findLessonsByTopic(topic));
    }
}