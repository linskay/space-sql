import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonsList from '../../components/LessonsList';
import axios from 'axios';

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        console.log('Fetching lessons from API...');
        const response = await axios.get('/api/lessons', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true
        });
        
        console.log('API Response:', response);
        
        if (response.status === 200) {
          setLessons(response.data || []);
        } else {
          setError(`Ошибка загрузки уроков: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setError(`Ошибка при загрузке уроков: ${err.message}`);
        
        // Если ошибка 401 (не авторизован), перенаправляем на страницу входа
        if (err.response && err.response.status === 401) {
          navigate('/login');
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-blue-500">Загрузка уроков...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p className="font-bold">Ошибка</p>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="lessons-page container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Уроки SQL</h1>
      {lessons.length > 0 ? (
        <LessonsList lessons={lessons} />
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg">Нет доступных уроков</p>
        </div>
      )}
    </div>
  );
}
