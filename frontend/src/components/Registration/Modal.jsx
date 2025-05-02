import React from 'react';
import styles from './Register.module.css';

const Modal = ({ message, onClose }) => {
  return (
    <div className={styles['modal__overlay']}>
      <div className={styles['modal__content']}>
        <h3>Ошибка</h3>
        <p>{message}</p>
        <button onClick={onClose} className={styles['modal__close-button']}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Modal;