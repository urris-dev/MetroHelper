import React, { useState } from 'react';
import styles from './ProfileEdit.module.css';
import Modal from '../common/Modal/Modal.jsx';

const ProfileEditForm = ({
  photoPreview,
  handlePhotoChange,
  error,
  loading,
  handleEdit,
  handleLogout,
  success,
  handleCloseModal,
  passwordType,
  togglePasswordVisibility
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    photo: null,
  });

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
    await handleEdit(formData);
  };

  return (
    <form className={styles['profile-edit-form']} onSubmit={handleSubmit}>
      <h2 className={styles['profile-edit-form__title']}>Редактирование профиля</h2>

      <div className={styles['profile-edit-form__photo-input']}>
        <span>Фото:</span>
        <label htmlFor="photo">
          <img
            src={photoPreview}
            alt="Превью"
            className={styles['profile-edit-form__photo-preview']}
          />
        </label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleChange}
        />
      </div>

      <div className={styles['profile-edit-form__email-input']}>
        <label>Электронная почта:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Введите новый email"
        />
      </div>

      <div className={styles['profile-edit-form__password-input']}>
        <label>Пароль:</label>
        <input
          type={passwordType}
          name="password"
          onChange={handleChange}
          placeholder="Введите новый пароль"
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

      {error && (
        <Modal
          type="error"
          message={error}
          onClose={handleCloseModal}
        />
      )}

      {success && (
        <Modal
          type="success"
          message="Данные успешно изменены"
          onClose={handleCloseModal}
        />
      )}

      <button
        className={styles['profile-edit-form__submit-button']}
        type="submit"
        disabled={loading}
      >
        {loading ? 'Загрузка...' : 'Сохранить изменения'}
      </button>

      <button
        className={styles['profile-edit-form__logout-button']}
        type="button"
        onClick={handleLogout}
      >
        Выйти из аккаунта
      </button>
    </form>
  );
};

export default ProfileEditForm;