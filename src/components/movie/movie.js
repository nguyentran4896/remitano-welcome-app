import React, {Component} from 'react';
import {Card, Col} from 'react-bootstrap';
import helpers from '../../helpers/helpers';

import './movie.scss';

export default class Movie extends Component {
  render() {
    const {title, description, url, userCreated} = this.props.video;
    const youtubeId = helpers.getYoutubeIdFromUrl(url);
    const urlEmbed = `https://youtube.com/embed/${youtubeId}`;
    return (
      <Col className="movie-card" style={{display: 'flex'}}>
        <div className="video-wrap embed-responsive embed-responsive-item embed-responsive-16by9">
          <iframe width="auto" height="auto" src={urlEmbed} frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
          </iframe>
        </div>
        <Card.Body>
          <Card.Link className="card-title" href={url}>{title}</Card.Link>
          <Card.Text>
            Shared by: {userCreated}
          </Card.Text>
          <Card.Text className="card-description">
            {description}
          </Card.Text>
        </Card.Body>
      </Col>
    );
  }
}
