import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import MovieList from '../movie-list/MovieList';

export default class HomePage extends Component {
  render() {
    return (
      <Container className="homepage">
        <MovieList />
      </Container>
    );
  }
}
