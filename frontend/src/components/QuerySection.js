import React, { useState } from 'react';
import SuccessAnimation from './SuccessAnimation';

function QuerySection({ task, onShowSchema, onShowHelp }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showEyeHint, setShowEyeHint] = useState(false);

  const checkQuery = async () => {
    setError(null);
    setResult(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, query })
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setSuccess(true);
      } else setError(data.message || 'Ошибка проверки');
    } catch (e) {
      setError('Ошибка запроса');
    }
  };

  return (
    <div className="main-task-content">
      <div className="task-container">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className="task-counter"></span>
        </div>
        <div className="task-description">{task.description}</div>
        <div className="task-schema">
          <h4><i className="fas fa-database"></i> Схема базы данных:</h4>
          <pre className="schema-definition">{task.schemaDefinition}</pre>
        </div>
      </div>
      <div className="action-buttons">
        <button className="schema-button" onClick={onShowSchema}>
          <i className="fas fa-database"></i> Показать схему БД
        </button>
        <button className="submit-button" onClick={checkQuery}>
          <i className="fas fa-paper-plane"></i> Проверить запрос
        </button>
        <button className="submit-button" onClick={onShowHelp}>
          <i className="fas fa-question-circle"></i> Помощь
        </button>
      </div>
      <div className="query-section">
        <h3 className="query-title"><i className="fas fa-terminal"></i> Ваш SQL запрос:</h3>
        <div className="eye-hint-container">
          <div 
            className="eye-hint-icon"
            onMouseEnter={() => setShowEyeHint(true)}
            onMouseLeave={() => setShowEyeHint(false)}
          >
            👁️
          </div>
          {showEyeHint && (
            <div className="eye-hint-text">
              {task.hint || 'Попробуй использовать ' + task.suggestedKeywords.join(', ')}
            </div>
          )}
        </div>
        <textarea
          className="query-input"
          placeholder="Введите ваш SQL запрос здесь..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      {error && <div className="result-container error">{error}</div>}
      {success && <div className="result-container success"><SuccessAnimation /></div>}
      {result && !success && <div className="result-container success">{JSON.stringify(result)}</div>}
    </div>
  );
}

export default QuerySection;
