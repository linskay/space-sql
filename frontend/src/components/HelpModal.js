import React from 'react';

function HelpModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="modal" id="help-modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h3 className="modal-title"><i className="fas fa-question-circle"></i> Помощь</h3>
        <div className="help-content">
          <p>Используйте SQL-запросы для решения задач.</p>
          <p>Нажмите <b>Проверить запрос</b>, чтобы узнать результат.</p>
          <p>Видите ошибку? Попробуйте изменить запрос и отправить снова!</p>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
