import React, {Component} from 'react';
import {Card, Col} from 'react-bootstrap';
import helpers from '../../helpers/helpers';
import voteServices from '../../services/voteServices';

import './movie.scss';
import Vote from './Vote';

export default class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: this.props.video,
    };

    this.isVotedUpVideo = this.isVotedUpVideo.bind(this);
    this.isVotedDownVideo = this.isVotedDownVideo.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
  }

  async voteUp() {
    try {
      const video = await voteServices.voteUp(this.props.video, this.props.userId);
      console.log(video);
      video.userCreated = undefined;
      this.setState({video});
    } catch (error) {
      console.log(error);
    }
  }

  voteDown() {
    voteServices.voteUp(this.props.video, this.props.userId);
  }

  isVotedUpVideo() {
    return voteServices.isVotedUp(this.props.video.id);
  }
  isVotedDownVideo() {
    return voteServices.isVotedDown(this.props.video.id);
  }

  render() {
    const {id, title, description, url, likes, disLikes} = this.state.video;
    const userId = this.props.userId;
    const userCreated = this.props.userCreated;
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
          <Card.Link className="card-title" href={url} target="_blank">{title}</Card.Link>
          <Card.Text className="card-author">Shared by: {userCreated.username}
            { /* TODO: handle vote up&down*/}
            <Vote
              handleVoteUp={this.voteUp}
              handleVoteDown={this.voteDown}
              votedUp={likes.includes(userId)}
              votedDown={disLikes.includes(userId)}
              videoId={id}/>
          </Card.Text>
          <Card.Text className="card-description">
            {description}
          </Card.Text>
        </Card.Body>
      </Col>
    );
  }
}
