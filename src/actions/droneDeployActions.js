import * as types from '../constants/action_types';

export default function setDronedeployAPI(api) {
  console.log(api);
  return {
    type: types.SET_DRONE_DEPLOY_API,
    payload: {
      api
    }
  };
}
