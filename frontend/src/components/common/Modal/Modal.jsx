import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ type, message, onClose }) => {
  return (
    <div className={styles['modal__overlay']}>
      <div className={styles['modal__content']}>
        {type == 'error' && 
        <h3>Ошибка</h3>
        }
        <p>{message}</p>
        <button onClick={onClose} className={styles['modal__close-button']}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Modal;