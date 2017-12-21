import immutable from 'immutable';
import * as types from '../constants/action_types';

const initialStateObject = {
  dronedeployApi: null
};

const initialState = immutable.fromJS(initialStateObject);

export default function dronedeploy(state = initialState, action) {
  switch (action.type) {
    case types.SET_DRONE_DEPLOY_API:
      const { api: dronedeployApi } = action.payload;
      return state.merge({ dronedeployApi });

    default:
      return state;
  }
}
