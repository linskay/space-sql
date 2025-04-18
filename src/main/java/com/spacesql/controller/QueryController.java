package com.spacesql.controller;

import com.spacesql.dto.QueryCheckRequest;
import com.spacesql.dto.QueryCheckResponse;
import com.spacesql.service.QueryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/query")
@RequiredArgsConstructor
@Tag(name = "Query Validation", description = "API for SQL query validation")
public class QueryController {
    private final QueryService queryService;

    @PostMapping("/check")
    @Operation(summary = "Validate SQL query", description = "Checks if user's SQL query matches the solution")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Validation result",
                    content = @Content(schema = @Schema(implementation = QueryCheckResponse.class))),
            @ApiResponse(responseCode = "404", description = "Task not found")
    })
    public ResponseEntity<QueryCheckResponse> checkQuery(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Query check request", required = true,
                    content = @Content(schema = @Schema(implementation = QueryCheckRequest.class)))
            @RequestBody QueryCheckRequest request) {
        return ResponseEntity.ok(queryService.checkQuery(request));
    }
}