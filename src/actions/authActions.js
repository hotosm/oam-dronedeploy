import * as types from '../constants/action_types';

export function checkTokenStatus(tokenTime) {
  return {
    type: types.CHECK_TOKEN_STATUS,
    tokenTime
  };
}
