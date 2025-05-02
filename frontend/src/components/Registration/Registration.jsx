import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from './Form.jsx';
import useRegistration from '../../hooks/registration.js';
import styles from './Register.module.css';
import '../normalize.css';

function Registration() {
    const {
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
    } = useRegistration();

    return (
        <div className={styles['registration-form']}>
            <div className={styles['registration-form__container']}>
                <h2 className={styles['registration-form__title']}>Регистрация</h2>
                <Link to="/login" className={styles['registration-form__login-link']}>
                    Уже зарегистрированы? Войти.
                </Link>
                <RegistrationForm
                    userType={userType}
                    setUserType={setUserType}
                    showPassword={showPassword}
                    passwordType={passwordType}
                    togglePasswordVisibility={togglePasswordVisibility}
                    handleRegister={handleRegister}
                    loading={loading}
                    error={error}
                    handleCloseModal={handleCloseModal}
                    isModalOpen={isModalOpen}
                    handlePhotoChange={handlePhotoChange}
                />
            </div>
        </div>                                    
    );
}
export default Registration;
