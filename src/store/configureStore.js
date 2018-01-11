import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import auth from '../reducers/auth';
import dronedeploy from '../reducers/dronedeploy';
import exporterMiddleware from './exporterMiddleware';

const createStoreWithMiddleware = applyMiddleware(thunk, exporterMiddleware)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(
    combineReducers({ auth, dronedeploy }),
    initialState
  );

  return store;
}
