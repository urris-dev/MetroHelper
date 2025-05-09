import { refreshUser } from "./authApi";

const API_URL = 'http://localhost:8000/api/users';

export const updateUserProfile = async (payload) => {
  const response = await fetch(`${API_URL}/edit-user-info`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status == 401) {
      await refreshUser();
      await updateUserProfile(payload);
      return;
    }
    throw new Error(response.statusText);
  }
};

export const setUserPhoto = async (formData) => {
  await fetch(`${API_URL}/set-user-photo`, {
    method: 'POST',
    body: formData,
  });  
};

export const changeUserPhoto = async (formData) => {
  const response = await fetch(`${API_URL}/change-user-photo`, {
    method: 'POST',
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status == 401) {
      await refreshUser();
      await changeUserPhoto(payload);
    }
    throw new Error(response.statusText);
  }
};