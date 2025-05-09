import React from 'react';
import styles from './Workspace.module.css';
import bellIcon from '../../assets/icons/bell.png';
import crossIcon from '../../assets/icons/cross.png';


const Homepage = ({ userType }) => {
  return (
    <>
      {userType === 'passenger' ? (
        <>
          <h2>Ваши заявки</h2>
          <ul className={styles['main__requests-list']}>
            <li className={styles['requests-list__available-request']}>
              <span>Заявка от 11.11.1111</span>
            </li>
            <li className={styles['requests-list__unavailable-request']}>
              <span>Заявка от 11.11.1111</span>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h2>Уведомления</h2>
          <ul className={styles['main__notifications-list']}>
            <li>
              <img src={bellIcon} alt="Notification" width='32px' />
              <span>Уведомление о запросе</span>
              <img src={crossIcon} alt="Cancel" />
            </li>
            <li>
              <img src={bellIcon} alt="Notification" width='32px' />
              <span>Уведомление о запросе</span>
              <img className={styles['notifictation__cancel-button']} src={crossIcon} alt="Cancel" />
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default Homepage;