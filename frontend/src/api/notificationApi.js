import { refreshUser } from './authApi';

const API_URL = 'http://localhost:8000/api/notifications'

export const fetchNotifications = async () => {
  const response = await fetch(`${API_URL}/notifications-list`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status == 401) {
      await refreshUser();
      await fetchNotifications();
      return;
    }
    throw new Error(response.statusText);
  }

  return await response.json(); 
}