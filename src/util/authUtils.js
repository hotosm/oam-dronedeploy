/* global window localStorage */
import url from 'url';
import queryString from 'query-string';
import tokenKey from '../constants/idToken';

export const currentUrl = window.location.href;

export const getToken = () => {
  const urlObject = url.parse(window.location.href);
  const storedToken = localStorage.getItem(tokenKey);
  if (urlObject.query) {
    const query = queryString.parse(urlObject.query);
    const { id_token: idToken } = query;
    if (idToken) {
      localStorage.setItem(tokenKey, idToken);
      return idToken;
    }
  } else if (storedToken) {
    return storedToken;
  }
  return null;
};
