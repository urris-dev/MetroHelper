import React, { useRef } from 'react';
import styles from './CreateRequest.module.css';
import { useCreateRequest } from '../../hooks/createRequest.js';
import Modal from '../common/Modal/Modal.jsx';

const CreateRequest = () => {
  const formRef = useRef(null);

  const { loading, success, handleSubmit, handleCloseModal } = useCreateRequest();

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    const formData = {
      luggage: form.luggage.value,
      departure_station: form.departure.value.trim(),
      destination_station: form.destination.value.trim(),
      departure_time: form.departureTime.value,
    };

    await handleSubmit(formData);
  };

  return (
    <form className={styles['request-form']} onSubmit={onSubmit} ref={formRef}>
      <h2 className={styles['request-form__title']}>Заявка на обслуживание</h2>

      <div className={styles['request-form__field']}>
        <label htmlFor="luggage">Наличие багажа:</label>
        <select name="luggage" id="luggage" required>
          <option value="false">Отсутствует</option>
          <option value="true">Есть</option>
        </select>
      </div>

      <div className={styles['request-form__field']}>
        <label htmlFor="departure">Станция отправления:</label>
        <input type="text" name="departure" id="departure" required />
      </div>

      <div className={styles['request-form__field']}>
        <label htmlFor="destination">Станция назначения:</label>
        <input type="text" name="destination" id="destination" required />
      </div>

      <div className={styles['request-form__field']}>
        <label htmlFor="departureTime">Время отправления:</label>
        <input type="time" name="departureTime" id="departureTime" required />
      </div>

      {success && (
        <Modal
        type="success"
        message='Заявка успешно создана'
        onClose={handleCloseModal}
        />
      )}

      <button className={styles['request-form__submit-button']} type="submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Создать заявку'}
      </button>
    </form>
  );
};

export default CreateRequest;