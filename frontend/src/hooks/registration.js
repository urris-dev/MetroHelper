import { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';

const useRegistration = () => {
  const [userType, setUserType] = useState('passenger');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordType(showPassword ? 'password' : 'text');
  };

  const validateForm = (formData) => {
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Пароли не совпадают');
    }
    
    if (formData.password.trim().length < 8) {
      throw new Error('Минимальная длина пароля - 8 символов');
    }
  };

  const handleRegister = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      validateForm(formData);
      
      const payload = new FormData();
      payload.append('fullname', formData.fullName);
      payload.append('email', formData.email);
      payload.append('password', formData.password);
      payload.append('photo', formData.photo);
      payload.append('userType', userType);
      if (userType === 'passenger') {
        payload.append('passengerType', formData.passengerType);
      }
      
      await registerUser(payload);
      navigate('/login', {state: {email: formData.email}});      
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

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Разрешены только файлы формата PNG, JPG или JPEG');
      setIsModalOpen(true);
      throw new Error();
    }
  
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Размер файла не должен превышать 5Мб');
      setIsModalOpen(true);
      throw new Error();
    }
  };

  return {
    userType,
    showPassword,
    passwordType,
    error,
    loading,
    isModalOpen,
    setUserType,
    togglePasswordVisibility,
    handleRegister,
    handleCloseModal,
    handlePhotoChange,
  };
};
export default useRegistration;