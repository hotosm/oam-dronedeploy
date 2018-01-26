import immutable from 'immutable';
import jwt from 'jsonwebtoken';
import * as types from '../constants/action_types';

const initialStateObject = {
  isAuthenticated: false
};

const initialState = immutable.fromJS(initialStateObject);

const tokenIsVaild = (token, currentTime) => {
  if (token) {
    const decoded = jwt.decode(token);
    const isValid = decoded.exp > currentTime;
    return isValid;
  }
  return false;
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_TOKEN_STATUS: {
      const { token, currentTime } = action.payload;
      const isAuthenticated = tokenIsVaild(token, currentTime);
      return state.merge({ isAuthenticated });
    }

    default:
      return state;
  }
}

