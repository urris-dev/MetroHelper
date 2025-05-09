import { useState } from 'react';
import { updateUserProfile, changeUserPhoto } from '../api/userApi';
import { logoutUser } from '../api/authApi';

export const useProfileEdit = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [photoPreview, setPhotoPreview] = useState(localStorage.getItem('userPhoto') || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordType(showPassword ? 'password' : 'text');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
    
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setPhotoPreview(base64String);
      localStorage.setItem("userPhoto", base64String);
    };
    reader.readAsDataURL(file);
  };

  const validatePassword = (formData) => {
    if (formData.password.trim().length < 8) {
        throw new Error('Минимальная длина пароля - 8 символов');
    }
    if (formData.password.trim().length > 60) {
        throw new Error('Максимальная длина пароля - 60 символов');
    }
  }

  const validateEmail = (formData) => {
    if (formData.email.length > 256) {
        throw new Error('Максимальная длина почты - 256 символов');
    }
  };

  const handleEdit = async (formData) => {    
    setLoading(true);
    setError(null);

    try {
      if (formData.email == "" && formData.password == "" && formData.photo == null) {
        throw new Error("Заполните данными хотя бы одно поле формы");
      }

      const payload = new Object();
      if (formData.email != "") {
        validateEmail(formData);
        payload['email'] = formData.email;
      }
      if (formData.password != "") {
        validatePassword(formData);
        payload['password'] = formData.password;
      }
      if (Object.keys(payload).length != 0) {
        await updateUserProfile(payload);
      }

      const form = new FormData();
      if (formData.photo != null) { 
        form.append("photo", formData.photo);
      }
      if (form.get("photo") != null) {
        await changeUserPhoto(form);
      }

      window.location.reload();
    } catch (err) {
      setError(err.message);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = '/login';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  return {
    photoPreview,
    handlePhotoChange,
    error,
    loading,
    handleEdit,
    handleLogout,
    isModalOpen,
    handleCloseModal,
    passwordType,
    togglePasswordVisibility
  };
};