import React from 'react';
import { useHomepage } from '../../hooks/homepage.js';
import RequestItem from './RequestItem';
import NotificationItem from './NotificationItem';
import styles from './Homepage.module.css';
import Modal from './Modal.jsx';

const Homepage = (userType) => {
  const { requests, notifications, loading, error, isModalOpen, activeRequest } = useHomepage(userType);
  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          request={activeRequest}
        />
      )}

      {userType['userType'] == 'passenger' && (
        <>
          <h2>Ваши заявки</h2>
          <ul className={styles['main__requests-list']}>
            {requests.map((req, index) => (
              <RequestItem key={index} request={req} />
            ))}
          </ul>
        </>
      )}

      {userType['userType'] == 'employee' && (
        <>
          <h2>Уведомления</h2>
          <ul className={styles['main__notifications-list']}>
            {notifications.map((notif, index) => (
              <NotificationItem key={index} notification={notif} onDismiss={notif.onDismiss} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Homepage;