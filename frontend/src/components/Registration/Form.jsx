import React, { useState, useRef } from 'react';
import styles from './Registration.module.css';
import Modal from '../common/Modal/Modal.jsx';

const RegistrationForm = ({ 
  userType, 
  setUserType, 
  passwordType, 
  togglePasswordVisibility,
  handleRegister,
  loading,
  error,
  handleCloseModal,
  isModalOpen,
  handlePhotoChange
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: null,
    userType: 'passenger',
    passengerType: 'Слабовидящий'
  });

  const photoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      try {
        handlePhotoChange(e);
        setFormData(prev => ({ ...prev, photo: files[0] }));
      } catch (err) {
        photoRef.current.value = "";
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(formData);
  };

  return (
    <form className={styles['registration-form__form']} onSubmit={handleSubmit}>
      <div className={styles['registration-form__field']}>
        <label htmlFor="userType" className={styles['registration-form__label']}>Тип пользователя:</label>
        <select
          id="userType"
          name="userType"
          value={userType}
          onChange={(e) => {
            setUserType(e.target.value);
            handleChange(e);
          }}
          className={styles['registration-form__select']}
        >
          <option value="passenger">Пассажир</option>
          <option value="employee">Сотрудник</option>
        </select>
      </div>

      <div className={styles['registration-form__field']}>
        <label htmlFor="fullName">ФИО:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          onChange={handleChange}
        />
      </div>

      <div className={styles['registration-form__field']}>
        <label htmlFor="email">Электронная почта:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
        />
      </div>

      <div className={styles['registration-form__field']}>
        <label htmlFor="password">Введите пароль:</label>
        <input
          type={passwordType}
          id="password"
          name="password"
          required
          onChange={handleChange}
        />
      </div>

      <div className={styles['registration-form__field']}>
        <label htmlFor="confirmPassword">Подтвердите пароль:</label>
        <input
          type={passwordType}
          id="confirmPassword"
          name="confirmPassword"
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

      <div className={styles['registration-form__field']}>
        <label htmlFor="photo">Фото:</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleChange}
          ref={photoRef}
          required
        />
      </div>

      {userType === 'passenger' && (
        <div>
          <label htmlFor="passengerType">Тип пассажира:</label>
          <select
            id="passengerType"
            name="passengerType"
            onChange={handleChange}
          >
            <option value="Слабовидящий">Слабовидящий пассажир</option>
            <option value="Колясочник">Пассажир-колясочник</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>

      {isModalOpen && (
        <Modal message={error} onClose={handleCloseModal} />
      )}
    </form>
  );
};

export default RegistrationForm;