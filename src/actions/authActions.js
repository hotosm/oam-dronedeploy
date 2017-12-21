import * as types from '../constants/action_types';

export function checkTokenStatus(token, currentTime) {
  return {
    type: types.CHECK_TOKEN_STATUS,
    payload: {
      token,
      currentTime
    }
  };
}
