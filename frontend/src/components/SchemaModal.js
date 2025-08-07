import React from 'react';

function SchemaModal({ open, onClose, schema }) {
  if (!open) return null;
  return (
    <div className="modal" id="schema-modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h3 className="modal-title"><i className="fas fa-database"></i> Схема базы данных</h3>
        <div id="schema-content" className="schema-tables">
          <pre>{schema}</pre>
        </div>
      </div>
    </div>
  );
}

export default SchemaModal;
