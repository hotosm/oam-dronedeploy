import immutable from 'immutable';
import jwt from 'jsonwebtoken';
import * as types from '../constants/action_types';

const initialStateObject = {
  isAuthenticated: false
};

const initialState = immutable.fromJS(initialStateObject);

const tokenIsVaild = (tokenTime) => {
  if (tokenTime.token) {
    const decoded = jwt.decode(tokenTime.token);
    const isValid = decoded.exp > tokenTime.currentTime;
    return isValid;
  }
  return false;
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_TOKEN_STATUS:
      const isAuthenticated = tokenIsVaild(action.tokenTime);
      return state.merge({ isAuthenticated });

    default:
      return state;
  }
}

