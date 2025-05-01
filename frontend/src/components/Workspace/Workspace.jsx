import React, {useState} from 'react';
import styles from './Workspace.module.css';
import '../normalize.css';
import plusIcon from '../../assets/icons/plus.png';
import userIcon from '../../assets/icons/user.png';
import homeIcon from '../../assets/icons/home.png';
import bellIcon from '../../assets/icons/bell.png';
import crossIcon from '../../assets/icons/cross.png';
import ratingIcon from '../../assets/icons/rating.png';


const Workspace = () => {
  const userType = 'passenger';
  const [activeTab, setActiveTab] = useState("openHomepage");

  const renderContent = () => {
        switch (activeTab) {
            case 'openHomepage':
                if (userType === 'passenger') {
                    return (
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
                    )
                } else if (userType === 'employee') {
                    return (
                        <>
                            <h2>Уведомления</h2>
                            <ul className={styles['main__notifications-list']}>
                                <li>
                                    <img src={bellIcon} alt="Notification" width='32px'/>
                                    <span>Уведомление о запросе</span>
                                    <img src={crossIcon} alt="Cancel"/>
                                </li>
                                <li>
                                    <img src={bellIcon} alt="Notification" width='32px'/>
                                    <span>Уведомление о запросе</span>
                                    <img className={styles['notifictation__cancel-button']} src={crossIcon} alt="Cancel"/>
                                </li>
                            </ul>
                        </>
                    )
                }
                else return <></>;
            case 'createRequest':
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
            case 'editUserProfile':
                return (
                    <form className={styles['main__user-profile-edit-form']}>
                        <h2 className={styles['user-profile-edit-form__title']}>Редактирование профиля</h2>

                        <div className={styles['user-profile-edit-form__photo-input']}>
                            <label for="photo">
                                <img src={userIcon} width='64px' alt="user photo"/>
                            </label>
                            <input type="file" name="photo" id='photo'/>
                        </div>
                        <div className={styles['user-profile-edit-form__email-input']}>
                            <label>Электронная почта:</label>
                            <input type="email" name="email" />
                        </div>
                        <div className={styles['user-profile-edit-form__password-input']}>
                            <label>Пароль:</label>
                            <input type="password" name="password" />
                        </div>
                        
                        <button className={styles['user-profile-edit-form__submit-button']} type="submit">Сохранить изменения</button>
                    </form>
                );            
            case 'checkRating':
                return (
                    <>
                        <h2>Рейтинг</h2>
                        <span>Ваш текущий рейтинг: 5.0</span>
                    </>
                );
            default:
                return null;
        }
    };

  return (
    <div className={styles.workspace}>
      <main className={styles.workspace__main}>
        {renderContent()}
      </main>
      <footer className={styles.workspace__footer}>
        {userType === 'passenger' && (
          <nav className={styles.footer__nav}>
            <button className={styles['passenger__nav-add-request-button']} onClick={() => setActiveTab('createRequest')}>
              <img src={plusIcon} alt="Plus" width='32px'/>
            </button>
            <button className={styles['passenger__nav-homepage-button']} onClick={() => setActiveTab('openHomepage')}>
              <img src={homeIcon} alt="Homepage" width='32px'/>
            </button>
            <button className={styles['passenger__nav-profile-button']} onClick={() => setActiveTab('editUserProfile')}>
              <img src={userIcon} alt="User" width='32px'/>
            </button>
          </nav>
        )}
        {userType === 'employee' && (
          <nav className={styles.footer__nav}>
            <button className={styles['passenger__nav-check-rating-button']} onClick={() => setActiveTab('checkRating')}>
              <img src={ratingIcon} alt="Rating" width='32px'/>
            </button>
            <button className={styles['employee__nav-homepage-button']} onClick={() => setActiveTab('openHomepage')}>
              <img src={homeIcon} alt="Homepage" width='32px'  />
            </button>
            <button className={styles['employee__nav-profile-button']} onClick={() => setActiveTab('editUserProfile')}>
              <img src={userIcon} alt="User" width='32px'  />
            </button>
          </nav>
        )}
      </footer>
    </div>
  );
};

export default Workspace;