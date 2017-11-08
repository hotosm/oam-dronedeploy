/* global localStorage fetch */
import { CALL_API } from '../constants/action_types';
import { checkTokenStatus } from '../actions/authActions';
import idTokenConstant from '../constants/idToken';

const BASE_URL = process.env.CATALOG_API_URL;

function callApi(endpoint, authenticated, store, method, json) {
  let config = {};
  if (authenticated) {
    const token = localStorage.getItem(idTokenConstant);
    if (token) {
      config = {
        method,
        headers: { Authorization: token },
        Accept: 'application/json',
        'Content-Type': 'application/json',
        body: JSON.stringify(json)
      };
    } else {
      throw new Error('No token saved!');
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response => response.text()
      .then(text => ({ text, response })))
    .then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text);
      }
      console.log(text);
      return text;
    }).catch(err => console.log(err));
}


const apiMiddlware = store => next => (action) => {
  if (action.type !== CALL_API) {
    return next(action);
  }
  const {
    endpoint,
    types,
    authenticated,
    method,
    json
  } = action;

  const [requestType, successType, errorType] = types;
  const token = localStorage.getItem(idTokenConstant);
  const currentTime = new Date().getTime() / 1000;
  store.dispatch(checkTokenStatus({ token, currentTime }));
  return callApi(endpoint, authenticated, store, method, json).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  );
};

export default apiMiddlware;
