/* global window localStorage */
import url from 'url';
import queryString from 'query-string';

export const currentUrl = window.location.href;
const tokenKey = 'id_token';

export const getToken = () => {
  const urlObject = url.parse(window.location.href);
  const storedToken = localStorage.getItem(tokenKey);
  if (urlObject.query) {
    const { id_token: idToken } = queryString.parse(urlObject.query);
    if (idToken) {
      localStorage.setItem(tokenKey, idToken);
      return idToken;
    }
  } else if (storedToken) {
    return storedToken;
  }
  return null;
};
