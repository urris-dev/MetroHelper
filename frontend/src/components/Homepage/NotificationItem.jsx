import React from 'react';
import styles from './NotificationItem.module.css';

const NotificationItem = ({ notification }) => {
  return (
    <li className={styles['notifications-list__item']}>
      <h3 className={styles['notification-item__title']}>Сопровождение {notification.passenger_type}</h3>
      <div className={styles['notification-item__description']}>
        Вам необходимо прибыть на станцию {notification.departure_station} в течение {(parseInt(notification.time) / 60).toFixed()} минут для сопровождения {notification.passenger} до станции {notification.destination_station}.
      </div>
    </li>
  );
};

export default NotificationItem;