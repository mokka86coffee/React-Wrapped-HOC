import React, { Component } from 'react';
import {connect} from 'react-redux';
import { reducer as formReducer, Field, reduxForm, onSubmit } from 'redux-form';
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


class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <button onClick={this.props.execSaga1}>execSaga1</button>
          <ContactForm />
        </div>
      </div>
    );
  }
}

export default connect(
  store => store, {
  execSaga1: () => ({ type: 'SAGA_ACTION' })
})(App);
