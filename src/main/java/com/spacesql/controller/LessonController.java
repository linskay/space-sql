package com.spacesql.controller;

import com.spacesql.dto.LessonDto;
import com.spacesql.service.LessonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
@Tag(name = "Lessons", description = "API for working with SQL lessons")
public class LessonController {
    private final LessonService lessonService;

    @GetMapping
    @Operation(summary = "Get all lessons", description = "Returns list of all available lessons")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved",
            content = @Content(schema = @Schema(implementation = LessonDto.class)))
    public ResponseEntity<List<LessonDto>> getAllLessons() {
        return ResponseEntity.ok(lessonService.findAllLessons());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get lesson by ID", description = "Returns a single lesson by its ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lesson found",
                    content = @Content(schema = @Schema(implementation = LessonDto.class))),
            @ApiResponse(responseCode = "404", description = "Lesson not found")
    })
    public ResponseEntity<LessonDto> getLessonById(
            @Parameter(description = "ID of the lesson to be retrieved", required = true)
            @PathVariable Long id) {
        return ResponseEntity.ok(lessonService.findLessonById(id));
    }

    @GetMapping("/topic/{topic}")
    @Operation(summary = "Get lessons by topic", description = "Returns lessons filtered by topic")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved",
            content = @Content(schema = @Schema(implementation = LessonDto.class)))
    public ResponseEntity<List<LessonDto>> getLessonsByTopic(
            @Parameter(description = "Topic to filter lessons", required = true)
            @PathVariable String topic) {
        return ResponseEntity.ok(lessonService.findLessonsByTopic(topic));
    }
}