import { useState, useEffect } from 'react';
import { fetchRequests } from '../api/requestApi';
import { fetchNotifications } from '../api/notificationApi.js';

export const useHomepage = (userType) => {
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    requests,
    notifications,
    loading,
    error,
  };
};