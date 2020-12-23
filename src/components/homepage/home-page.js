import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import Paginate from '../paginate/paginate';

export default class HomePage extends Component {
  render() {
    return (
      <Container className="homepage">
        <Paginate />
      </Container>
    );
  }
}
