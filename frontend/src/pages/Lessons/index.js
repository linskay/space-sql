import React, { useEffect, useState } from 'react';
import LessonsList from '../../components/LessonsList';

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/lessons')
      .then(res => res.json())
      .then(data => {
        setLessons(data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="lessons-page">
      <h1>Уроки SQL</h1>
      <LessonsList lessons={lessons} />
    </div>
  );
}
