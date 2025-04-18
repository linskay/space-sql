package com.spacesql.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QueryCheckResponse {
    private boolean isCorrect;
    private String feedback;
    private String expectedQuery;
}