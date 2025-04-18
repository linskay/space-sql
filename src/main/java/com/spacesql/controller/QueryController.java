package com.spacesql.controller;

import com.spacesql.dto.QueryCheckRequest;
import com.spacesql.dto.QueryCheckResponse;
import com.spacesql.service.QueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/query")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QueryController {
    private final QueryService queryService;

    @PostMapping("/check")
    public ResponseEntity<?> checkQuery(@RequestBody QueryCheckRequest request) {
        try {
            if (request.getTaskId() == null) {
                throw new IllegalArgumentException("Task ID is required");
            }
            if (request.getUserQuery() == null || request.getUserQuery().trim().isEmpty()) {
                throw new IllegalArgumentException("SQL query cannot be empty");
            }

            QueryCheckResponse response = queryService.checkQuery(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("timestamp", LocalDateTime.now().toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}