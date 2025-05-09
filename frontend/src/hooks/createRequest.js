import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { submitRequest } from '../api/requestApi';

export const useCreateRequest = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setSuccess(false);

      const requestData = {
        ...formData,
        luggage: formData.luggage === 'true',
      };

      await submitRequest(requestData);
      setSuccess(true);
    } catch (err) {
      if (err.message == 'Unauthorized') {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSuccess(false);
  };

  return {
    loading,
    success,
    handleSubmit,
    handleCloseModal,
  };
};