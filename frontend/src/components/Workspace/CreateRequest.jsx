import React from 'react';
import styles from './Workspace.module.css';

const CreateRequest = () => {
  return (
    <form className={styles['main__request-form']}>
      <h2 className={styles['request-form__title']}>Заявка на обслуживание</h2>
      <div className={styles['request-form__luggage-select']}>
        <label>Наличие багажа:</label>
        <select name="luggage">
          <option value="false">Отсутствует</option>
          <option value="true">Есть</option>
        </select>
      </div>
      <div className={styles['request-form__depart-station-input']}>
        <label>Станция отправления:</label>
        <input type="text" name="departure" />
      </div>
      <div className={styles['request-form__dest-station-input']}>
        <label>Станция назначения:</label>
        <input type="text" name="destination" />
      </div>
      <div className={styles['request-form__depart-time-input']}>
        <label>Время отправления:</label>
        <input type="time" name="departureTime" />
      </div>
      <button className={styles['request-form__submit-button']} type="submit">Создать заявку</button>
    </form>
  );
};

export default CreateRequest;