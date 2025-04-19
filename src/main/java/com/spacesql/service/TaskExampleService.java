package com.spacesql.service;

import com.spacesql.entity.Task;
import com.spacesql.entity.TaskExampleData;
import com.spacesql.repository.TaskExampleDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskExampleService {
    private final TaskExampleDataRepository repository;

    @Transactional(readOnly = true)
    public Optional<TaskExampleData> findByTaskId(Long taskId) {
        return repository.findByTaskId(taskId);
    }

    @Transactional
    public TaskExampleData saveExampleData(Task task, String exampleData) {
        Optional<TaskExampleData> existing = repository.findByTaskId(task.getId());

        if (existing.isPresent()) {
            TaskExampleData data = existing.get();
            data.setExampleData(exampleData);
            return repository.save(data);
        } else {

            TaskExampleData data = TaskExampleData.builder()
                    .task(task)
                    .exampleData(exampleData)
                    .build();
            return repository.save(data);
        }
    }
}