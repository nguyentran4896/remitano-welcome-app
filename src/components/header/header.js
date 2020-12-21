import React, {Component} from 'react';
import {
  Navbar,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

export default class Header extends Component {
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
              <FormControl type="text" placeholder="Email" className="mr-sm-2" />
              <FormControl type="text" placeholder="Password" className="mr-sm-2" />
              <Button variant="outline-success">Login</Button>
            </Form>
          </Navbar.Collapse>
          <hr/>
        </Navbar>
      </div>
    );
  }
}
