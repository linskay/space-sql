import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CosmicRegisterForm from '../../components/CosmicRegisterForm';
import StarBackground from '../../components/StarBackground';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // The error from useAuth is for login/register API calls,
  // let's use a local error state for client-side validation like password mismatch.
  const [formError, setFormError] = useState('');
  const { register, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setFormError("Пароли не совпадают");
    }
    
    if (password.length < 6) {
      return setFormError("Пароль должен содержать минимум 6 символов");
    }
    
    setIsSubmitting(true);
    setFormError('');
    
    try {
      await register(email, password);
      navigate('/'); // Перенаправить на главную после успешной регистрации
    } catch (error) {
      // The authError from useAuth will be displayed in the form
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StarBackground>
      <CosmicRegisterForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={formError || authError} // Display client-side or server-side errors
      />
    </StarBackground>
  );
};

export default Register;
