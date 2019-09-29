import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

function withData(WrappedComponent, getAsyncData) {
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

const ListWithChildren = withChildFunction(
  ItemList,
  ({word}) => <li key={word}>{word}</li>
);

const First = withData(ListWithChildren, getFirst);
const Second = withData(ListWithChildren, getSecond);
const Third = withData(ListWithChildren, getThird);

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <First />
        <Second />
        <Third />
      </div>
    );
  }
}

export default App;

