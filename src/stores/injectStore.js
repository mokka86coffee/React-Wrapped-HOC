import {injectReducer, createInjectStore} from 'redux-reducers-injector';

const initialState = {};

const reducerForInjectStore = (store) => ({...store, injectStore: true});

const reducersObject = {
  inject: reducerForInjectStore,
  // rootReducer // - здесь можно вставить стандартные redux редьюсеры
};

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // - Redux Dev Tools

const store = createInjectStore(
  reducersObject,
  initialState,
  // composeEnhancers(applyMiddleware(sagaMiddleware)) // - здесь можно вставить стандартные мидлвары
);

injectReducer('injectField', reducerForInjectStore);

export default store;