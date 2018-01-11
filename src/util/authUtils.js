/* global window localStorage */
const key = 'id_token';

export const getToken = () => {
  const storedToken = localStorage.getItem(key);
  return storedToken;
};

export const setToken = (token) => {
  localStorage.setItem(key, token);
};
