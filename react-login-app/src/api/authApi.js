import config from '../config';
import jwt from 'jsonwebtoken';


export const getRefreshToken = async () => {
  try {
    const response = await fetch(
      `${config.url}/api/auth/refresh-token`,{ credentials: 'include' });
    
    if (!response.ok)  throw await response.json();

      const responseJson = await response.json();
      const token = jwt.decode(responseJson.data.token);
      const { exp, iat, data  } = token
      const user = { ...data, token: responseJson.data.token }
    
    return user;

  } catch (err) {
    throw err.message
  }
};

export const login = async (formData) => {
  try {
    const response = await fetch(`${config.url}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if(!response.ok) throw responseJson.json();

    const responseJson = await response.json();
    const token = jwt.decode(responseJson.data.token);
    const { exp, iat, data  } = token
    const user = { ...data, token: responseJson.data.token}

    return user;

  } catch (err) {
    throw err;
  }
};

export const register = async (data) => {
  try {
    const user = await fetch(`${config.url}/api/auth/register`, {
      body: JSON.stringify(data),
    });
    return user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
