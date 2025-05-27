const API_URL = 'http://localhost:8000/api/users';

export const registerUser = async (payload) => {
  const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      if (response.status == 409) {
        throw new Error('409 Error');
      }
      throw new Error((await response.json()).detail);
    }    
  };

export const loginUser = async (payload) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status == 400) {
      throw new Error((await response.json()).detail);
    }
    throw new Error(response.statusText);
  } 
};

export const logoutUser = async () => {
  await fetch(`${API_URL}/logout`, {
    method: 'DELETE',
    credentials: 'include',
  });
}

export const refreshUser = async () => {
  const response = await fetch(`${API_URL}/refresh`, {
    method: 'POST',
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status == 401) {
      throw new Error('Unauthorized');
    }
  } 
}
