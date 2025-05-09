import React from 'react';
import styles from './Workspace.module.css';
import plusIcon from '../../assets/icons/plus.png';
import userIcon from '../../assets/icons/user.png';
import homeIcon from '../../assets/icons/home.png';
import bellIcon from '../../assets/icons/bell.png';
import crossIcon from '../../assets/icons/cross.png';
import ratingIcon from '../../assets/icons/rating.png';

const Navigation = ({ userType, activeTab, setActiveTab }) => {

  return (
    <footer className={styles.workspace__footer}>
      {userType === 'passenger' && (
        <nav className={styles.footer__nav}>
          <button className={styles['passenger__nav-add-request-button']} onClick={() => setActiveTab('createRequest')}>
            <img src={plusIcon} alt="Plus" width="32px" />
          </button>
          <button className={styles['passenger__nav-homepage-button']} onClick={() => setActiveTab('openHomepage')}>
            <img src={homeIcon} alt="Homepage" width="32px" />
          </button>
          <button className={styles['passenger__nav-profile-button']} onClick={() => setActiveTab('editUserProfile')}>
            <img src={userIcon} alt="User" width="32px" />
          </button>
        </nav>
      )}
      {userType === 'employee' && (
        <nav className={styles.footer__nav}>
          <button className={styles['passenger__nav-check-rating-button']} onClick={() => setActiveTab('checkRating')}>
            <img src={ratingIcon} alt="Rating" width="32px" />
          </button>
          <button className={styles['employee__nav-homepage-button']} onClick={() => setActiveTab('openHomepage')}>
            <img src={homeIcon} alt="Homepage" width="32px" />
          </button>
          <button className={styles['employee__nav-profile-button']} onClick={() => setActiveTab('editUserProfile')}>
            <img src={userIcon} alt="User" width="32px" />
          </button>
        </nav>
      )}
    </footer>
  );
};

export default Navigation;