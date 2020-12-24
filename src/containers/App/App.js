import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../components/Header/Header';
import HomePage from '../../components/HomePage/HomePage';
import SharePage from '../../components/SharePage/SharePage';

import authenticationServices from '../../services/authenticationServices';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationServices.currentUserValue,
      userId: authenticationServices.currentUserValue ? authenticationServices.currentUserValue._id : null,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    authenticationServices.currentUser.subscribe((nextUser) => {
      // vote or unvote, not change login status
      if (this.state.currentUser && nextUser && this.state.currentUser._id === nextUser._id) return;

      // change login status
      if (nextUser || (this.state.currentUser && !nextUser)) {
        this.setState({currentUser: nextUser, userId: nextUser ? nextUser._id : null});
      }
    });
  }

  login(username, password) {
    authenticationServices.login(username, password);
  }

  logout() {
    authenticationServices.logout();
  }

  signUp(username, password) {
    authenticationServices.signUp(username, password);
  }

  render() {
    return (
      <BrowserRouter>
        <Header handleSignUp={this.signUp} handleLogin={this.login} handleLogout={this.logout} currentUser={this.state.currentUser}/>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{marginTop: '50px'}}
        />
        <Switch>
          <Route path='/share' component={() => <SharePage currentUser={this.state.currentUser} />} />
          <Route path='/' component={() => <HomePage userId={this.state.userId} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
