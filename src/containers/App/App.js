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
      currentUser: authenticationServices.currentUserValue,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    authenticationServices.currentUser.subscribe((x) => {
      this.setState({currentUser: x});
    });
  }

  login(username, password) {
    authenticationServices.login(username, password);
  }

  logout() {
    authenticationServices.logout();
  }


  render() {
    return (
      <BrowserRouter>
        <Header handleLogin={this.login} handleLogout={this.logout} currentUser={this.state.currentUser}/>
        <Switch>
          <Route path='/share' component={SharePage} />
          <Route path='/' component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
