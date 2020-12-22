import './App.css';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../../components/header/header';
import HomePage from '../../components/homepage/home-page';
import SharePage from '../../components/share/share';

import authenticationServices from '../../services/authenticationServices';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    authenticationServices.currentUser.subscribe((x) => this.setState({currentUser: x}));

    console.log(authenticationServices.currentUser);
  }

  logout() {
    authenticationServices.logout();
    history.push('/login');
  }

  render() {
    return (
      <BrowserRouter>
        <Header handleLogin={authenticationServices.login} />
        <Switch>
          <Route path='/share' component={SharePage} />
          <Route path='/' component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
