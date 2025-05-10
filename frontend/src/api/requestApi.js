import { refreshUser } from './authApi.js';

const API_URL = 'http://localhost:8000/api/requests';

export const submitRequest = async (requestData) => {
  const response = await fetch(`${API_URL}/create-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    if (response.status == 401) {
      await refreshUser();
      await submitRequest(requestData);
      return;
    }
    throw new Error(response.statusText);
  }
};

export const fetchRequests = async () => {
  const response = await fetch(`${API_URL}/requests-list`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status == 401) {
      await refreshUser();
      await fetchRequests();
      return;
    }
    throw new Error(response.statusText);
  }

  return await response.json();
}

export const deleteRequest = async (requestId) => {
  const response = await fetch(`${API_URL}/delete-request?request_id=${requestId}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (!response.ok) {
    if (response.status == 401) {
      await refreshUser();
      await deleteRequest(requestId);
      return;
    }
    throw new Error((await response.json()).detail);
  }
}
