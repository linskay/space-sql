package com.spacesql.controller;

import com.spacesql.dto.LessonDto;
import com.spacesql.dto.TaskDto;
import com.spacesql.service.LessonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
@Tag(name = "Управление уроками", description = "API для работы с уроками и заданиями")
public class LessonController {
    private final LessonService lessonService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Получить все уроки", description = "Возвращает список всех доступных уроков")
    @ApiResponse(responseCode = "200", description = "Уроки успешно получены",
            content = @Content(schema = @Schema(implementation = LessonDto.class)))
    public ResponseEntity<List<LessonDto>> getAllLessons() {
        return ResponseEntity.ok(lessonService.findAllLessons());
    }

    @GetMapping(value = "/{lessonId}/tasks", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Получить задания урока", description = "Возвращает все задания для указанного урока")
    @ApiResponse(responseCode = "200", description = "Задания успешно получены",
            content = @Content(schema = @Schema(implementation = TaskDto.class)))
    public ResponseEntity<List<TaskDto>> getTasksByLessonId(@PathVariable Long lessonId) {
        return ResponseEntity.ok(lessonService.findLessonById(lessonId).getTasks());
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Получить урок по ID", description = "Возвращает урок по его идентификатору")
    @ApiResponse(responseCode = "200", description = "Урок успешно получен",
            content = @Content(schema = @Schema(implementation = LessonDto.class)))
    public ResponseEntity<LessonDto> getLessonById(@PathVariable Long id) {
        return ResponseEntity.ok(lessonService.findLessonById(id));
    }

    @GetMapping(value = "/by-topic/{topic}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Получить уроки по теме", description = "Возвращает уроки по указанной теме")
    @ApiResponse(responseCode = "200", description = "Уроки успешно получены",
            content = @Content(schema = @Schema(implementation = LessonDto.class)))
    public ResponseEntity<List<LessonDto>> getLessonsByTopic(@PathVariable String topic) {
        return ResponseEntity.ok(lessonService.findLessonsByTopic(topic));
    }
}