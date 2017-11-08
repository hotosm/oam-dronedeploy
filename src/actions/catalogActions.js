import * as types from '../constants/action_types';

export function testCall() {
  return {
    type: types.CALL_API,
    endpoint: '/analytics',
    authenticated: true,
    types: [
      types.SEND_TEST_CALL,
      types.SEND_TEST_CALL_SUCCEEDED,
      types.SEND_TEST_CALL_FAILED
    ],
    method: 'GET'
  };
}
