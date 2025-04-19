package com.spacesql.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spacesql.entity.Task;
import com.spacesql.entity.TaskExampleData;
import com.spacesql.service.TaskExampleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/tasks/{taskId}/examples")
public class TaskExampleController {

    private final TaskExampleService exampleService;

    public TaskExampleController(TaskExampleService exampleService) {
        this.exampleService = exampleService;
    }

    @GetMapping
    public ResponseEntity<?> getExamples(@PathVariable Long taskId) {
        return exampleService.findByTaskId(taskId)
                .map(data -> {
                    try {
                        ObjectMapper mapper = new ObjectMapper();
                        Map<String, Object> exampleData = mapper.readValue(data.getExampleData(), new TypeReference<Map<String, Object>>() {});
                        return ResponseEntity.ok(exampleData);
                    } catch (JsonProcessingException e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TaskExampleData> addExample(
            @PathVariable Task taskId,
            @RequestBody Map<String, Object> exampleData) {
        try {
            // Конвертируем объект в JSON строку для хранения
            ObjectMapper mapper = new ObjectMapper();
            String exampleDataJson = mapper.writeValueAsString(exampleData);
            return ResponseEntity.ok(exampleService.saveExampleData(taskId, exampleDataJson));
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}