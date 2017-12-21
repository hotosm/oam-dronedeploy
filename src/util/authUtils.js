/* global window localStorage */
import tokenKey from '../constants/idToken';

export const getToken = () => {
  const storedToken = localStorage.getItem(tokenKey);
  return storedToken;
};

export const setToken = (token) => {
  localStorage.setItem(tokenKey, token);
};
