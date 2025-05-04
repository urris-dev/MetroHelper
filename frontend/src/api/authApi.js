export const registerUser = async (payload) => {
  const response = await fetch('http://127.0.0.1:8000/api/users/register', {
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
      throw new Error(response.statusText);
    }    
  };

export const setUserPhoto = async (formData) => {
  await fetch('http://127.0.0.1:8000/api/users/set-user-photo', {
    method: 'POST',
    body: formData
  });  
};
