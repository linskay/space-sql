package com.spacesql.controller;

import com.spacesql.entity.Task;
import com.spacesql.entity.TaskExampleData;
import com.spacesql.service.TaskExampleService;
import com.spacesql.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/tasks/{taskId}/examples")
@RequiredArgsConstructor
@Tag(name = "Примеры заданий", description = "API для работы с примерами заданий")
public class TaskExampleController {
    private final TaskExampleService exampleService;
    private final TaskService taskService;

    @SneakyThrows
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Получить примеры для задания", description = "Возвращает примеры данных для указанного задания")
    @ApiResponse(responseCode = "200", description = "Примеры успешно получены")
    @ApiResponse(responseCode = "404", description = "Задание не найдено")
    public ResponseEntity<Map<String, Object>> getExamples(@PathVariable Long taskId) {
        return ResponseEntity.ok(exampleService.getExamplesForTask(taskId));
    }

    @SneakyThrows
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Добавить пример для задания", description = "Добавляет новый пример данных для задания")
    @ApiResponse(responseCode = "200", description = "Пример успешно добавлен",
            content = @Content(schema = @Schema(implementation = TaskExampleData.class)))
    public ResponseEntity<TaskExampleData> addExample(
            @PathVariable Long taskId,
            @RequestBody Map<String, Object> exampleData) {
        Task task = taskService.getById(taskId);
        return ResponseEntity.ok(exampleService.saveExampleData(task, exampleData));
    }
}