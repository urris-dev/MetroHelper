export const registerUser = async (formData) => {
    const response = await fetch('http://127.0.0.1:8000/api/users/register', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Ошибка регистрации');
    }
    
    return await response.json();
  };
