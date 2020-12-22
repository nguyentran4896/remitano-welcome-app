import React, {Component} from 'react';
import {
  Navbar,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import './header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.login = this.login.bind(this);
  }
  login() {
    const {handleLogin}= this.props;
    const {username, password} = this.state;
    if (!username || !password) {
      alert('missing information');
    }
    handleLogin(username, password);
  }
  render() {
    return (
      <div className="header">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#home">
            <img
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            {' '}
            Funny Movies
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{flexDirection: 'row-reverse'}}>
            <Form inline>
              <FormControl type="text" placeholder="Email" className="mr-sm-2" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
              <FormControl type="text" placeholder="Password" className="mr-sm-2" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
              <Button onClick={this.login} variant="outline-success">Login</Button>
            </Form>
          </Navbar.Collapse>
          <hr/>
        </Navbar>
      </div>
    );
  }
}
