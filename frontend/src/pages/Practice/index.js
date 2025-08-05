import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

// Sample exercises - in a real app, these would come from a backend API
const exercises = [
  {
    id: 1,
    title: 'Простой SELECT запрос',
    description: 'Напишите SQL запрос для выборки всех полей из таблицы `users`',
    solution: 'SELECT * FROM users;',
    schema: 'CREATE TABLE users (id INT, name VARCHAR(100), email VARCHAR(100));',
  },
  {
    id: 2,
    title: 'Фильтрация с WHERE',
    description: 'Выберите всех пользователей старше 18 лет из таблицы `users`',
    solution: 'SELECT * FROM users WHERE age > 18;',
    schema: 'CREATE TABLE users (id INT, name VARCHAR(100), age INT);',
  },
  // Add more exercises as needed
];

export default function Practice() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const exercise = exercises[currentExercise];

  const handleRunQuery = async () => {
    if (!query.trim()) {
      setError('Пожалуйста, введите SQL запрос');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, this would be an API call to your backend
      // const response = await axios.post('/api/execute-query', { query });
      // setResult(response.data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple check for demonstration purposes
      const normalizedQuery = query.trim().toLowerCase();
      const normalizedSolution = exercise.solution.toLowerCase();
      
      if (normalizedQuery === normalizedSolution) {
        setResult({ success: true, message: 'Отлично! Запрос выполнен успешно!', data: [] });
        setIsCompleted(true);
      } else {
        setError('Неверный запрос. Попробуйте еще раз.');
        setResult(null);
      }
    } catch (err) {
      setError('Произошла ошибка при выполнении запроса');
      console.error('Query execution error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setQuery('');
      setResult(null);
      setError('');
      setIsCompleted(false);
      setShowHint(false);
    }
  };

  const handleReset = () => {
    setQuery('');
    setResult(null);
    setError('');
    setShowHint(false);
  };

  if (!exercise) {
    return (
      <div className="practice-page container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Практические задания завершены!</h1>
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="practice-page container mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6 shadow-lg mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Задание {currentExercise + 1} из {exercises.length}</h1>
          <div className="text-gray-400">
            Сложность: <span className="text-yellow-400">★☆☆</span>
          </div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">{exercise.title}</h2>
          <p className="text-gray-300 mb-4">{exercise.description}</p>
          
          <div className="mb-4">
            <h3 className="text-sm font-mono text-gray-400 mb-1">Схема таблицы:</h3>
            <pre className="bg-gray-800 p-3 rounded text-green-400 text-sm overflow-x-auto">
              {exercise.schema}
            </pre>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="sql-query" className="text-white font-medium">Ваш SQL запрос:</label>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              {showHint ? 'Скрыть подсказку' : 'Показать подсказку'}
            </button>
          </div>
          
          {showHint && (
            <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-3 mb-3 text-blue-200 text-sm">
              <strong>Подсказка:</strong> {exercise.solution}
            </div>
          )}
          
          <textarea
            id="sql-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-32 p-3 bg-gray-900 text-white rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Введите ваш SQL запрос здесь..."
            spellCheck="false"
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleRunQuery}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isLoading
                ? 'bg-blue-800 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isLoading ? 'Выполнение...' : 'Выполнить запрос'}
          </button>
          
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Сбросить
          </button>
        </div>
      </motion.div>
      
      {(result || error) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg mb-6 ${
            result?.success ? 'bg-green-900 bg-opacity-50 border border-green-700' : 'bg-red-900 bg-opacity-50 border border-red-700'
          }`}
        >
          <h3 className="font-semibold mb-2">
            {result?.success ? '✓ Успех!' : 'Ошибка'}
          </h3>
          <p className={result?.success ? 'text-green-300' : 'text-red-300'}>
            {result?.message || error}
          </p>
          
          {result?.data && (
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-700">
                    {Object.keys(result.data[0] || {}).map((key) => (
                      <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {result.data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-700">
                      {Object.values(row).map((cell, j) => (
                        <td key={j} className="px-4 py-2 text-sm text-gray-300">
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}
      
      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-900 bg-opacity-50 border border-green-700 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-300">✓ Задание выполнено!</h3>
              <p className="text-green-200">Отличная работа! Вы успешно выполнили задание.</p>
            </div>
            <button
              onClick={handleNextExercise}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Следующее задание
            </button>
          </div>
        </motion.div>
      )}
      
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          ← Назад к урокам
        </button>
        
        <div className="text-gray-400 text-sm">
          Нужна помощь? Нажмите на кнопку "Показать подсказку" выше.
        </div>
      </div>
    </div>
  );
}
