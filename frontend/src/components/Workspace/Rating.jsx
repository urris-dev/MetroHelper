import React, { useState, useEffect } from 'react';
import { getEmployeeRating } from '../../api/userApi';

const Rating = () => {
  const [employeeRating, setEmployeeRating] = useState(0.000);

  useEffect(() => {
    const loadData = async () => {
      try {
        setEmployeeRating(await getEmployeeRating());
      } catch (err) {
        if (err.message == 'Unauthorized') {
          navigate('/login');
        }
      }
    };

    loadData();
  }, []);

  return (
    <>
      <h2>Рейтинг сотрудника</h2>
      <span>Ваш текущий рейтинг: {employeeRating}</span>
    </>
  );
};

export default Rating;