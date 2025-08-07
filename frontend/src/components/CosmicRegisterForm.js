import React from 'react';
import { Link } from 'react-router-dom';
import './CosmicLoginForm.css'; // Reusing the same CSS

const CosmicRegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
  isSubmitting,
  error,
}) => {
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2 className="login-title">Регистрация</h2>
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

          <div className="input-group">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="register-link">
          <p>
            Уже есть аккаунт? <Link to="/login">Войдите</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CosmicRegisterForm;
