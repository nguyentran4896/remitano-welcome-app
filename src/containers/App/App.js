import './App.css';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../../components/header/header';
import HomePage from '../../components/homepage/home-page';
import SharePage from '../../components/share/share';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/share' component={SharePage} />
          <Route path='/' component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
