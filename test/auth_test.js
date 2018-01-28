import test from 'tape';
import jwt from 'jsonwebtoken';
import * as types from '../src/constants/action_types';
import auth from '../src/reducers/auth';

test('auth', (t) => {
  const action = {
    payload: {
      token: null
    },
    type: types.CHECK_TOKEN_STATUS
  };
  const state = auth(undefined, action);
  const isAuthenticated = state.get('isAuthenticated');
  t.false(isAuthenticated);
  t.end();
}, 'Returns unauthenticated with null token');

test('auth', (t) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNTE3MDg2NTU3In0.2fg8HwsyXDeqRj_0dzDNCcoAVaCur-gcLwq9toufHbo';
  const currentTime = 1517079357;
  const action = {
    payload: {
      token,
      currentTime
    },
    type: types.CHECK_TOKEN_STATUS
  };
  const state = auth(undefined, action);
  const isAuthenticated = state.get('isAuthenticated');
  t.true(isAuthenticated);
  t.end();
}, 'Returns authenticated for token with valid expiration');
