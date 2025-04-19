package com.spacesql.repository;

import com.spacesql.entity.Lesson;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    @Query("SELECT l FROM Lesson l ORDER BY l.orderIndex ASC")
    List<Lesson> findAllOrdered();

    @EntityGraph(attributePaths = "tasks")
    @Query("SELECT l FROM Lesson l WHERE l.id = :lessonId")
    Optional<Lesson> findByIdWithTasks(@Param("lessonId") Long lessonId);

    @Query("SELECT l FROM Lesson l WHERE l.topic = :topic ORDER BY l.orderIndex ASC")
    List<Lesson> findByTopicOrdered(@Param("topic") String topic);
}