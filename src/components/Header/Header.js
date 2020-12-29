import React, {Component} from 'react';
import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import helpers from '../../helpers/helpers';
import {toast} from 'react-toastify';

import './header.scss';

const TOAST_DEFAULT_OPTIONS = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  login() {
    const {handleLogin} = this.props;
    const {username, password} = this.state;

    if (!this.verifyInput(username, password)) {
      return;
    };

    handleLogin(username, password);
  }

  logout() {
    const {handleLogout} = this.props;
    const {username} = this.state;
    handleLogout(username);
  }

  signUp() {
    const {handleSignUp} = this.props;
    const {username, password} = this.state;

    if (!this.verifyInput(username, password)) {
      return;
    };

    handleSignUp(username, password);
  }

  render() {
    return (
      <div className="header">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/">
            <img
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Youtube Video Sharing logo"
            />
            {' '}
            Youtube Video Sharing
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {this.props.currentUser ?
            <Navbar.Collapse>
              <Form inline>
                <Navbar.Text>Signed in as: {this.props.currentUser.username}</Navbar.Text>
              </Form>
              <Nav.Link href="/share">Share</Nav.Link>
              <Button className="pull-right" onClick={this.logout} variant="outline-secondary">Logout</Button>
            </Navbar.Collapse> :

            <Navbar.Collapse>
              <Form inline>
                <FormControl type="text" placeholder="Email" className="mr-sm-2" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                <FormControl type="password" placeholder="Password" className="mr-sm-2" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                <Button onClick={this.login} variant="outline-success">Login</Button>
                <Button onClick={this.signUp} variant="outline-primary">Sign Up</Button>
              </Form>
            </Navbar.Collapse>
          }
        </Navbar>
      </div>
    );
  }

  verifyInput(username, password) {
    if (!helpers.isEmailValid(username)) {
      toast.error('Your email is not valid! Please check again.', TOAST_DEFAULT_OPTIONS);
      return false;
    }

    if (!password || password.length < 6) {
      toast.error('Your password must be at least 6 characters! Please check again.', TOAST_DEFAULT_OPTIONS);
      return false;
    }

    return true;
  }
}
