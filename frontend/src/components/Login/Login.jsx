import React from "react";
import { Link } from 'react-router-dom';
import LoginForm from "./Form.jsx";
import { useLogin } from "../../hooks/login.js";
import styles from './Login.module.css';
import '../normalize.css';

function Login() {
    const {
      showPassword,
      passwordType,
      error,
      loading,
      togglePasswordVisibility,
      handleLogin,
      handleCloseModal,
      isModalOpen,
    } = useLogin();

  return (
    <div className={styles['login-container']}>
      <h2 className={styles['login-form__title']}>Вход</h2>
      <Link to="/register" className={styles['login-container__register-link']}>Нет аккаунта? Зарегистрироваться.</Link>
      <Link to="/workspace" className={styles['login-container__register-link']}>Основная страница.</Link>
      <LoginForm
        showPassword={showPassword}
        passwordType={passwordType}
        error={error}
        loading={loading}
        togglePasswordVisibility={togglePasswordVisibility}
        handleLogin={handleLogin}
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}

export default Login;