import React, {Component} from 'react';
import {Card, Col} from 'react-bootstrap';
import './movie.css';

export default class Movie extends Component {
  render() {
    return (
      <Col className="movie-card" sm={12} md={6} lg={6} style={{display: 'flex'}}>
        <div className="embed-responsive embed-responsive-16by9" style={{minWidth: '300px'}}>
          <iframe width="auto" height="auto" src="https://www.youtube.com/embed/TfeFwZcE0Lg" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
          </iframe>
        </div>
        <Card.Body>
          <Card.Title>Movie Title</Card.Title>
          <Card.Text>
            Shared by: {'Someone'}
          </Card.Text>
          <Card.Text>
            Desscription: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          </Card.Text>
        </Card.Body>
      </Col>
    );
  }
}
