import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CosmicLoginForm from '../../components/CosmicLoginForm';
import StarBackground from '../../components/StarBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Определяем, откуда пришел пользователь, чтобы вернуть его обратно после логина
  const from = location.state?.from?.pathname || '/lessons';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      // После успешного входа перенаправляем пользователя
      navigate(from, { replace: true });
    } catch (err) {
      // Ошибка будет обработана и отображена через `error` из useAuth
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StarBackground>
      <CosmicLoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </StarBackground>
  );
};

export default Login;
