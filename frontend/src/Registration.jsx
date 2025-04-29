import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Registration() {
    const [userType, setUserType] = useState('passenger');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState("password");

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleShowPasswordChange = () => {
        setShowPassword(!showPassword);
         if (showPassword) {
            setPasswordType("password");
        } else {
            setPasswordType("text");
        }};

    return (
        <div className="registration-form">
            <div className="registration-form__container">
                <h2 className="registration-form__title">Регистрация</h2>
                <Link to="/login" className="registration-form__login-link">
                    Уже зарегистрированы? Войти.
                </Link>
                <form className="registration-form__form">
                    <div className="registration-form__field">
                        <label htmlFor="userType" className="registration-form__label">Тип пользователя:</label>
                        <select
                            className="registration-form__select"
                            id="userType"
                            name="userType"                          
                            
                            value={userType}
                            onChange={handleUserTypeChange}
                        >                   
                            <option value="passenger">Пассажир</option>
                            <option value="employee">Сотрудник</option>
                        </select>
                    </div>                    
                    <div className="registration-form__field">
                        <label htmlFor="fullName">ФИО:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            
                            required
                        />
                    </div>                    
                    <div className="registration-form__field">
                        <label htmlFor="email">Электронная почта:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            
                            required
                        />
                    </div>                    
                    <div className="registration-form__field">
                        <label htmlFor="password">Введите пароль:</label>
                        <input
                            type={passwordType}
                            id="password"
                            name="password"
                            
                            required
                        />
                    </div>                    
                    <div className="registration-form__field">
                        <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                        <input
                            type={passwordType}
                            id="confirmPassword"
                            name="confirmPassword"
                            
                            required
                        />
                    </div>
                     
                    <div>
                        <label htmlFor="showPassword">
                            <input type="checkbox" id="showPassword" onChange={handleShowPasswordChange}/>
                            <span>Показать пароль</span>
                        </label>
                    </div>                    
                    <div className="registration-form__field">
                        <label htmlFor="photo">Фото:</label>
                        <input
                            className="registration-form__input"
                            type="file"
                            id="photo"
                            placeholder="Добавьте фото"                            
                            />
                    </div>
                    
                    {userType === 'passenger' && (
                        <div>
                            <label htmlFor="passengerType">Тип пассажира:</label>
                            <select
                                id="passengerType"
                                name="passengerType"
                                >
                                <option value="visuallyImpaired">Слабовидящий пассажир</option>
                                <option value="wheelchairUser">Пассажир-колясочник</option>
                            </select>
                        </div>
                    )}

                    {userType === 'employee' && (
                        <div className="registration-form__employee-fields">
                           <span>Укажите Ваш график работы</span>
                                
                                <div className="registration-form__field">
                                    <label htmlFor="scheduleFrom">Начало:</label>
                                    <input
                                        type="time"
                                        id="scheduleFrom"
                                        name="scheduleFrom"
                                        
                                        />
                                </div>
                                    <div className="registration-form__field">
                                        <label htmlFor="scheduleTo">Конец</label>
                                        <input
                                        type="time"
                                        id="scheduleTo"
                                        name="scheduleTo"
                                                                           
                                        />
                                    </div>
                            </div>
                        )}
                    <button
                        type="submit">
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>                                    
    );
}
export default Registration;
