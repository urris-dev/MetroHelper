import React from 'react';
import styles from './RequestItem.module.css';
import crossItem from '../../assets/icons/cross.png';
import { deleteRequest } from '../../api/requestApi';

const RequestItem = ({ request }) => {
  return (
    <li className={styles['requests-list__item']}>
      <h3 className={styles['request-item__title']}>Заявка №{request.id}</h3>
      <div className={styles['request-item__description']}>
        {request.luggage == true && 
        <span>Наличие багажа: Есть</span>
        }
        {request.luggage == false && 
        <span>Наличие багажа: Отсутствует</span>
        }
        <span>Станция отправления: {request.departure_station}</span>
        <span>Станция прибытия: {request.destination_station}</span>
        <span>Время отправления: {request.departure_time.slice(0, 5)}</span>
      </div>
      <button className={styles['request-item__delete-button']} onClick={async () => {await deleteRequest(request.id); window.location.reload()}}>
        <img src={crossItem} alt="x" />
      </button>
    </li>
  );
};

export default RequestItem;