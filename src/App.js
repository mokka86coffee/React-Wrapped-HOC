import React, { Component } from 'react';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {injectReducer, createInjectStore} from 'redux-reducers-injector';
import {Provider, connect} from 'react-redux';
import { reducer as formReducer, Field, reduxForm, onSubmit } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import logo from './logo.svg';
import './App.css';

let ContactForm = (props = {}) => {
  const handleSubmit = (e, ...args) => {
    e.preventDefault();
    console.log('tcl args', args);
    onSubmit(args);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <Field name="firstName" component="input" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm);


const sagaMiddleware = createSagaMiddleware();
export const workerSaga = function* () {
  console.log("TCL: workerSaga")
  const __call = yield call(fetch, 'o');
  console.log("TCL: __call", __call)
  yield put({type: 'SAGA_ASYNC_ACTION'});
}

const watcherSaga = function*() {
  yield takeEvery('SAGA_ACTION', workerSaga);
}


const getData = (word) => new Promise(resolve => 
  setTimeout(
    () => resolve([1,2].map(el => ({word: word + '  ' + Math.random()}))
  ), 1200));

const getFirst = () => getData('First Data');
const getSecond = () => getData('Second Data');
const getThird = () => getData('Third Data');

const ItemList = (props) => {
  const {data, children} = props;

  if (data.length === 0) {
    return <p>Loading...</p>;
  }

  return <ul>{data.map(children)}</ul>;
}

const withChildFunction = (WrappedComponent, fn) => (
  (props) => <WrappedComponent {...props}>{fn}</WrappedComponent>
);

const withData = (WrappedComponent, getAsyncData) => {
  return class extends Component {

    state = { data: [] }

    async componentDidMount() {
      const data = await getAsyncData();
      this.setState({ data });
    }

    render() {
      const { data } = this.state;
      return <WrappedComponent data={data} {...this.props} />
    }

  }
}

const renderName = ({word}) => <li key={word}>{word}</li>;

const First = withData(withChildFunction(ItemList, renderName), getFirst);
const Second = withData(withChildFunction(ItemList, renderName), getSecond);
const Third = withData(withChildFunction(ItemList, renderName), getThird);

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <ContactForm />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <First />
        <Second />
        <Third />
        <ReduxCompConnected />
      </div>
    );
  }
}

const AppConnected = connect(store => store)(App);

const reducerOne = (store, action) => ({...store, one: action.type});
const reducerTwo = (store, action) => ({...store, two: action.type});
const rootReducer = combineReducers({
  One: reducerOne,
  Two: reducerTwo,
  form: formReducer
});


const reducerForInjectStore = (store) => ({...store, a: 1});

const reducersObject = {
  inject: reducerForInjectStore,
  rootReducer
};

const initialState = {};


const logMiddleware = store => next => action => (console.table(action), next(action));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createInjectStore(
  reducersObject,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
); 
sagaMiddleware.run(watcherSaga);
injectReducer('injectField', reducerForInjectStore);


// const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(logMiddleware)));

export default () => <Provider store={store}><AppConnected /></Provider>;

function ReduxComp({one, two, sagaDispatch}) {
  return (
    <React.Fragment>
      <button value="someValue1" onClick={one}>One</button>
      <button value="someValue2" onClick={two}>Two</button>
      <button value="sagaDispatch" onClick={sagaDispatch}>sagaDispatch</button>
    </React.Fragment>
  );
}

var ReduxCompConnected = connect(
  store => store,
  {
    one: ({target: {value}}) => ({type: value}),
    two: ({target: {value}}) => ({type: value}),
    sagaDispatch: () => ({type: 'SAGA_ACTION'})
  }
)(ReduxComp);
