import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuerySection from './QuerySection';

function LessonDetails() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lessonTitle, setLessonTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Загружаем заголовок урока
        const lessonResponse = await fetch(`http://localhost:8080/api/lessons/${id}`);
        if (!lessonResponse.ok) throw new Error('Ошибка загрузки урока');
        const lessonData = await lessonResponse.json();
        setLessonTitle(lessonData.title || `Урок ${id}`);
        
        // Загружаем задания
        const tasksResponse = await fetch(`http://localhost:8080/api/lessons/${id}/tasks`);
        if (!tasksResponse.ok) throw new Error('Ошибка загрузки заданий');
        const tasksData = await tasksResponse.json();
        
        if (!tasksData || !tasksData.length) {
          throw new Error('Нет заданий для этого урока');
        }
        
        setTasks(tasksData);
        setError(null);
      } catch (err) {
        console.error('Ошибка:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleNextTask = () => {
    setCurrentTaskIndex(prev => (prev + 1) % tasks.length);
  };

  const handlePrevTask = () => {
    setCurrentTaskIndex(prev => (prev - 1 + tasks.length) % tasks.length);
  };

  if (loading) return (
    <div className="lesson-container">
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> Загрузка заданий...
      </div>
    </div>
  );
  
  if (error) return (
    <div className="lesson-container">
      <div className="error">
        <i className="fas fa-exclamation-triangle"></i> {error}
      </div>
    </div>
  );

  const currentTask = tasks[currentTaskIndex];

  return (
    <div className="lesson-container">
      <button className="back-button" onClick={() => window.history.back()}>
        <i className="fas fa-arrow-left"></i> Назад к урокам
      </button>
      
      <div className="lesson-header">
        <h2>{lessonTitle} - Задание {currentTaskIndex + 1}/{tasks.length}</h2>
        <p>{currentTask.description}</p>
      </div>
      
      <div className="task-navigation">
        <button onClick={handlePrevTask} disabled={currentTaskIndex === 0}>
          Предыдущее
        </button>
        <button onClick={handleNextTask} disabled={currentTaskIndex === tasks.length - 1}>
          Следующее
        </button>
      </div>
      
      <QuerySection 
        task={currentTask} 
      />
    </div>
  );
}

export default LessonDetails;
