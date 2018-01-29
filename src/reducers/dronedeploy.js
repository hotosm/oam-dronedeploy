import * as types from '../constants/action_types';
import { succeeded, none, failed } from '../constants/exportStatus';

const initialState = {
  dronedeployApi: null,
  exportStatus: none
};

export default function dronedeploy(state = initialState, action) {
  switch (action.type) {
    case types.SET_DRONE_DEPLOY_API: {
      const { api: dronedeployApi } = action.payload;
      return Object.assign({}, state, { dronedeployApi });
    }

    case types.EXPORT_IMAGE_SUCCEEDED: {
      return Object.assign({}, state, { exportStatus: succeeded });
    }

    case types.EXPORT_IMAGE_FAILED: {
      return Object.assign({}, state, { exportStatus: failed });
    }

    default:
      return state;
  }
}
