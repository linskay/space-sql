package com.spacesql.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spacesql.entity.Task;
import com.spacesql.entity.TaskExampleData;
import com.spacesql.repository.TaskExampleDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskExampleService {
    private final TaskExampleDataRepository repository;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public Optional<TaskExampleData> findByTaskId(Long taskId) {
        return repository.findByTaskId(taskId);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getExamplesForTask(Long taskId) throws JsonProcessingException {
        TaskExampleData exampleData = repository.findByTaskId(taskId)
                .orElseThrow(() -> new RuntimeException("Примеры для задания не найдены"));

        return objectMapper.readValue(exampleData.getExampleData(),
                new com.fasterxml.jackson.core.type.TypeReference<>() {
                });
    }

    @Transactional
    public TaskExampleData saveExampleData(Task task, Map<String, Object> exampleData) throws JsonProcessingException {
        String exampleDataJson = objectMapper.writeValueAsString(exampleData);

        Optional<TaskExampleData> existing = repository.findByTaskId(task.getId());

        if (existing.isPresent()) {
            TaskExampleData data = existing.get();
            data.setExampleData(exampleDataJson);
            return repository.save(data);
        } else {
            TaskExampleData newData = TaskExampleData.builder()
                    .task(task)
                    .exampleData(exampleDataJson)
                    .build();
            return repository.save(newData);
        }
    }
}