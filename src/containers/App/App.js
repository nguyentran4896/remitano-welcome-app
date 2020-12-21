import './App.css';
import React, {Component} from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import Header from '../../components/header/header';
import HomePage from '../../components/pages/home-page';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <HomePage/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
