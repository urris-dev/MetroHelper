import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { submitRequest } from '../api/requestApi';

export const useCreateRequest = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validateDepartureTime = async (formData) => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const departureDateTime = new Date(`${todayStr}T${formData.departure_time}`);

    if (departureDateTime <= now) {
      throw new Error('Время отправления должно быть поздней текущего момента');
    }
  }

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setSuccess(false);
      await validateDepartureTime(formData);

      const requestData = {
        ...formData,
        luggage: formData.luggage === 'true',
      };

      await submitRequest(requestData);
      setSuccess(true);
      window.location.reload();
    } catch (err) {
      if (err.message == 'Unauthorized') {
        navigate('/login');
      }
      setError(err.message);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSuccess(false);
    setError(null);
  };

  return {
    loading,
    success,
    handleSubmit,
    handleCloseModal,
    error, 
    isModalOpen,
  };
};