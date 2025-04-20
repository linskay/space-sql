package com.spacesql.controller;

import com.spacesql.dto.QueryCheckRequest;
import com.spacesql.dto.QueryCheckResponse;
import com.spacesql.service.QueryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@Tag(name = "Проверка SQL-запросов", description = "API для проверки SQL-запросов")
public class QueryController {
    private final QueryService queryService;

    @PostMapping(value = "/check", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Проверить SQL-запрос", description = "Проверяет корректность SQL-запроса пользователя")
    @ApiResponse(responseCode = "200", description = "Запрос проверен успешно",
            content = @Content(schema = @Schema(implementation = QueryCheckResponse.class)))
    public ResponseEntity<QueryCheckResponse> checkQuery(@RequestBody QueryCheckRequest request) {
        return ResponseEntity.ok(queryService.checkQuery(request));
    }
}