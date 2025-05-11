import React, { useState } from 'react';
import styles from './RatingModal.module.css';
import { ratingRequest } from '../../api/requestApi';

const RatingModal = ({ request }) => {
  const [rating, setRating] = useState(1);

  return (
    <div className={styles['modal__overlay']}>
      <div className={styles['modal__content']}>
      <h3 className={styles['modal__title']}>Оцените выполнение заявки №{request.id}</h3>
      <div className={styles['radio-input']}>
          {[5, 4, 3, 2, 1].map((val) => (
            <input
              key={val}
              value={val}
              name="value-radio"
              id={`value-${val}`}
              type="radio"
              className={styles['star']}
              onChange={(e) => {setRating(e.target.value)}}
            />
          ))}
        </div>
      <button onClick={() => {ratingRequest(request.id, rating); window.location.reload()}} className={styles['modal__close-button']}>Завершить оценку</button>
      </div>
    </div>
  );
};

export default RatingModal;