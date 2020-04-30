import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

export const setAuthHeader = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    api.defaults.headers.common.Authorization = `Bearer ${user.token}`;
  } catch (error) {
    api.defaults.headers.common.Authorization = '';
  }
};

if (localStorage.getItem('user')) {
  setAuthHeader();
}
