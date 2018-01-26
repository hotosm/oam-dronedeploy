import * as types from '../constants/action_types';

const initialState = {
  dronedeployApi: null
};

export default function dronedeploy(state = initialState, action) {
  switch (action.type) {
    case types.SET_DRONE_DEPLOY_API: {
      const { api: dronedeployApi } = action.payload;
      return Object.assign({}, state, { dronedeployApi });
    }

    default:
      return state;
  }
}
