import React from 'react';

function AuthPanel({ user, setUser }) {
  const handleLogout = () => {
    fetch('/logout', { method: 'POST' }).then(() => setUser(null));
  };
  return (
    <div className="auth-panel">
      {!user || !user.authenticated ? (
        <a href="/oauth2/authorization/github" className="auth-button github-login">
          <i className="fab fa-github"></i> Войти через GitHub
        </a>
      ) : (
        <div className="user-info" style={{ display: 'flex' }}>
          <img src={user.avatarUrl || 'https://via.placeholder.com/40'} alt="Avatar" className="user-avatar" />
          <span className="user-name">{user.username || 'Пользователь'}</span>
          <button className="logout-button" onClick={handleLogout}>Выйти</button>
        </div>
      )}
    </div>
  );
}

export default AuthPanel;
