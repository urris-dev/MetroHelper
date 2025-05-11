import { useState, useEffect } from 'react';
import { fetchRequests, fetchActiveRequest } from '../api/requestApi';
import { fetchNotifications } from '../api/notificationApi.js';
import { useNavigate } from 'react-router-dom';

export const useHomepage = (userType) => {
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (userType['userType'] == 'passenger') {
          const requestsData = await fetchRequests();
          setRequests(requestsData);
        }
        else if (userType['userType'] == 'employee') {
          const notificationsData = await fetchNotifications();
          setNotifications(notificationsData);
        }

        const now = new Date();
        const time = now.toTimeString().slice(0, 5);
        const activeReq = await fetchActiveRequest(time);

        if (activeReq != null) {
          setActiveRequest(activeReq);
          setIsModalOpen(true);
        }
      } catch (err) {
        if (err.message == 'Unauthorized') {
          navigate('/login');
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    requests,
    notifications,
    loading,
    error,
    activeRequest,
    isModalOpen,
    handleCloseModal,
  };
};