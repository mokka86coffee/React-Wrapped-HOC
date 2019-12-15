import {createStore, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import middlewares, {sagasMiddleware, watcherSagas} from '../middlewares/index';

const initialState = {};

const rootReducer = store => store;

const store = createStore(rootReducer, initialState,  middlewares);

sagasMiddleware.run(watcherSagas);

export default store;