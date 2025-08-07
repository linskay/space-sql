import React from 'react';
import { Link } from 'react-router-dom';
import './CosmicLoginForm.css';

const CosmicLoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  isSubmitting,
  error,
}) => {
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2 className="login-title">Вход в систему</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Электронная почта</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Пароль</label>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="register-link">
          <p>
            Еще нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CosmicLoginForm;
