import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/lessons/${id}`)
      .then(res => res.json())
      .then(data => {
        setLesson(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Загрузка урока...</div>;
  if (!lesson) return <div>Урок не найден</div>;

  return (
    <div className="lesson-detail-page">
      <h1>{lesson.title}</h1>
      <div className="lesson-content">
        {lesson.content}
      </div>
    </div>
  );
}
