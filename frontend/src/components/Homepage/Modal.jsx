import React, { useState } from 'react';
import styles from './Modal.module.css';
import RatingModal from './RatingModal';

const Modal = ({ request }) => {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  return (
    <>
    {isRatingModalOpen && (
      <RatingModal request={request}/>
    )}

    {isRatingModalOpen == false && (

      <div className={styles['modal__overlay']}>
      <div className={styles['modal__content']}>
        <h3 className={styles['modal__title']}>Выполнение заявки №{request.id}</h3>
        <p className={styles['modal_description']}>Сопровождение от станции {request.departure_station} до станции {request.destination_station}.</p>
        {request.user_type == 'passenger' && 
          <button onClick={() => {setIsRatingModalOpen(true)}} className={styles['modal__close-button']}>Завершить выполнение</button>
        }
      </div>
    </div>
    )}
  </>
  );
};

export default Modal;