package com.spacesql.dto;

import lombok.Data;

@Data
public class QueryCheckRequest {
    private Long taskId;
    private String userQuery;
}