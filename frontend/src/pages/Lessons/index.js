import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LessonsList from '../../components/LessonsList';
import { Button } from '../../components/ui';
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
      <div className="flex justify-center items-center min-h-screen">
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="loading-spinner mx-auto" />
          <p className="text-cosmic-blue text-xl font-space">Загрузка уроков...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-6">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-6">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-space text-red-300 mb-4">Ошибка загрузки</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <Button 
              variant="danger"
              onClick={() => window.location.reload()}
            >
              Попробовать снова
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="cosmic-title text-4xl lg:text-5xl mb-4">
            Уроки SQL
          </h1>
          <p className="text-xl text-gray-300 font-space max-w-2xl mx-auto">
            Изучайте SQL шаг за шагом в космическом путешествии
          </p>
        </motion.div>

        {lessons.length > 0 ? (
          <LessonsList lessons={lessons} />
        ) : (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-6xl mb-6">🌌</div>
            <p className="text-gray-400 text-lg font-space">
              Пока нет доступных уроков
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Скоро здесь появятся захватывающие космические приключения!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
