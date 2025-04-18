package com.spacesql.service;

import com.spacesql.dto.QueryCheckRequest;
import com.spacesql.dto.QueryCheckResponse;
import com.spacesql.repository.TaskRepository;
import com.spacesql.util.SqlValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QueryService {
    private final TaskRepository taskRepository;
    private final SqlValidator sqlValidator;

    public QueryCheckResponse checkQuery(QueryCheckRequest request) {
        return taskRepository.findById(request.getTaskId())
                .map(task -> {
                    boolean isCorrect = sqlValidator.validateQuery(task.getSolutionQuery(), request.getUserQuery());
                    return QueryCheckResponse.builder()
                            .isCorrect(isCorrect)
                            .feedback(isCorrect ? "Правильно!" : "Неверный запрос")
                            .expectedQuery(isCorrect ? null : task.getSolutionQuery())
                            .build();
                })
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }
}