import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import Paginate from '../Paginate/Paginate';

export default class HomePage extends Component {
  render() {
    return (
      <Container className="homepage">
        <Paginate />
      </Container>
    );
  }
}
