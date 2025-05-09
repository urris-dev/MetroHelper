import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordType(showPassword ? 'password' : 'text');
  };

  const validateForm = (formData) => {
    if (formData.password.trim().length < 8) {
        throw new Error('Минимальная длина пароля - 8 символов');
    }
    if (formData.password.trim().length > 60) {
        throw new Error('Максимальная длина пароля - 60 символов');
    }
  
    if (formData.email.length > 256) {
        throw new Error('Максимальная длина почты - 256 символов');
    }
  };

  const handleLogin = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      validateForm(formData);

      let payload = new Object();
      payload['userType'] = formData.userType;
      payload['email'] = formData.email;
      payload['password'] = formData.password;
      await loginUser(payload);
      
      localStorage.setItem("userType", formData.userType);
      localStorage.setItem("userPhoto", `http://localhost:8000/media/${formData.email}/avatar.png`);
      navigate('/workspace');   
    } catch (err) {
      setError(err.message);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    showPassword,
    passwordType,
    error,
    loading,
    togglePasswordVisibility,
    handleLogin,
    handleCloseModal,
    isModalOpen,
  };
};