import React, {useState} from "react";
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import '../normalize.css';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    
    const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
     if (showPassword) {
        setPasswordType("password");
    } else {
        setPasswordType("text");
    }};

  return (
    <div className={styles['login-container']}>
      <h2 className={styles['login-form__title']}>Вход</h2>
      <Link to="/register" className={styles['login-container__register-link']}>Нет аккаунта? Зарегистрироваться.</Link>
      <Link to="/workspace" className={styles['login-container__register-link']}>Основная страница.</Link>
      <form className={styles['login-form']}>
        <div className={styles['input-group']}>
          <label htmlFor="email">Электронная почта:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles['input-group']}>
          <label htmlFor="password">Пароль:</label>
          <input type={passwordType} id="password" name="password" required />
        </div>
        <div>
            <label htmlFor="showPassword">
            <input type="checkbox" id="showPassword" onChange={handleShowPasswordChange}/>
            <span>Показать пароль</span>
            </label>
        </div>  
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;