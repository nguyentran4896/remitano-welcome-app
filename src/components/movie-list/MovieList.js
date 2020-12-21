import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import Movie from '../movie/movie';

export default class MovieList extends Component {
  render() {
    return (
      <Row className="film-list">
        <Movie/>
        <Movie/>
        <Movie/>
      </Row>
    );
  }
}
