import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import { setUserPhoto } from '../api/userApi';

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
    if (formData.password.trim().length > 60) {
      throw new Error('Максимальная длина пароля - 60 символов');
    }

    if (formData.fullName.length > 100) {
      throw new Error('Максимальная длина ФИО - 100 символов');
    }

    if (formData.email.length > 256) {
      throw new Error('Максимальная длина почты - 256 символов');
    }
  };

  const handleRegister = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      validateForm(formData);
      
      let payload = new Object();
      payload['fullname'] = formData.fullName;
      payload['email'] = formData.email;
      payload['password'] = formData.password;
      payload['userType'] = formData.userType;
      if (userType === 'passenger') {
        payload['passengerType'] = formData.passengerType;
      }
      await registerUser(payload);
      
      payload = new FormData();
      payload.append('email', formData.email);
      payload.append('userType', formData.userType);
      payload.append('photo', formData.photo);
      await setUserPhoto(payload);

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        localStorage.setItem('userPhoto', base64String);
      };
      reader.readAsDataURL(formData.photo);

      navigate('/login', {state: {email: formData.email, userType: formData.userType}});      
    } catch (err) {
      if (err.message == '409 Error') {
        navigate('/login', {state: {email: formData.email}});
      }
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
  
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Размер файла не должен превышать 3Мб');
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