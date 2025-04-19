package com.spacesql.repository;

import com.spacesql.entity.TaskExampleData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskExampleDataRepository extends JpaRepository<TaskExampleData, Long> {
    Optional<TaskExampleData> findByTaskId(Long taskId);
}