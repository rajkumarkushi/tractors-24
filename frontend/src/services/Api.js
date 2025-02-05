import axios from 'axios';

const api = axios.create({
  baseURL: 'YOUR_API_BASE_URL',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginUser = async (data) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/login', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signupUser = async (data) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/signup', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const socialLogin = async (provider, token) => {
  try {
    const response = await api.post(`/auth/${provider}`, { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

