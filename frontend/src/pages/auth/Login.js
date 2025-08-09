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

  // После логина всегда отправляем на главную страницу
  const from = '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      // После успешного входа перенаправляем пользователя на главную
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
