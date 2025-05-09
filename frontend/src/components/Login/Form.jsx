import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Login.module.css';
import Modal from '../common/Modal/Modal.jsx';

const LoginForm = ({
  passwordType,
  error,
  loading,
  togglePasswordVisibility,
  handleLogin,
  handleCloseModal,
  isModalOpen,
}) => {
  const location = useLocation();
  const email = location.state?.email;
  const userType = location.state?.userType;
  const [formData, setFormData] = useState({
    userType: userType || 'passenger',
    email: email,
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();    
    await handleLogin(formData);
  };

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <div className={styles['input-group']}>
        <label htmlFor="userType">Тип пользователя:</label>
        <select
          id="userType"
          name="userType"
          onChange={handleChange}
          value={formData.userType}
        >
          <option value="passenger">Пассажир</option>
          <option value="employee">Сотрудник</option>
        </select>
      </div>

      <div className={styles['input-group']}>
        <label htmlFor="email">Электронная почта:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
        />
      </div>

      <div className={styles['input-group']}>
        <label htmlFor="password">Пароль:</label>
        <input
          type={passwordType}
          id="password"
          name="password"
          required
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="showPassword">
          <input
            type="checkbox"
            id="showPassword"
            onChange={togglePasswordVisibility}
          />
          <span>Показать пароль</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? 'Загрузка...' : 'Войти'}
      </button>

      {isModalOpen && (
        <Modal type="error" message={error} onClose={handleCloseModal} />
      )}
    </form>
  );
};

export default LoginForm;