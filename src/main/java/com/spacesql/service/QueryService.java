package com.spacesql.service;

import com.spacesql.dto.QueryCheckRequest;
import com.spacesql.dto.QueryCheckResponse;
import com.spacesql.entity.Task;
import com.spacesql.exception.ResourceNotFoundException;
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
        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("Задача не найдена"));

        boolean isCorrect = sqlValidator.validateQuery(task.getSolutionQuery(), request.getUserQuery());

        return buildResponse(task, request.getUserQuery(), isCorrect);
    }

    private QueryCheckResponse buildResponse(Task task, String userQuery, boolean isCorrect) {
        String feedback = isCorrect ? "✅ Запрос верный!" : "❌ Неверный запрос. Проверьте синтаксис и логику.";
        return QueryCheckResponse.builder()
                .isCorrect(isCorrect)
                .feedback(feedback)
                .expectedQuery(isCorrect ? null : task.getSolutionQuery())
                .build();
    }
}