import {applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {watcherSagas} from './sagasMiddleware';

const logMiddleware = store => next => action => (console.table(action), next(action));

const sagasMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default composeEnhancers(applyMiddleware(sagasMiddleware, logMiddleware));

export {
  sagasMiddleware,
  watcherSagas
};