import React, {Component} from 'react';
import {Card, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-regular-svg-icons';

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

    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
    this.unVote = this.unVote.bind(this);
  }

  async voteUp() {
    try {
      const video = await voteServices.voteUp(this.state.video, this.props.userId);
      video.userCreated = undefined;
      this.setState({video: video});
    } catch (error) {
      console.log(error);
    }
  }

  async voteDown() {
    try {
      const video = await voteServices.voteDown(this.state.video, this.props.userId);
      video.userCreated = undefined;
      this.setState({video: video});
    } catch (error) {
      console.log(error);
    }
  }

  async unVote() {
    try {
      const video = await voteServices.unVote(this.state.video, this.props.userId);
      video.userCreated = undefined;
      this.setState({video: video});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {id, title, description, url, likes, disLikes} = this.state.video;

    const userId = this.props.userId;
    const userCreated = this.props.userCreated;
    const urlEmbed = `https://youtube.com/embed/${helpers.getYoutubeIdFromUrl(url)}`;
    return (
      <Col className="movie-card animate__animated animate__fadeIn" >
        <div className="video-wrap embed-responsive embed-responsive-item embed-responsive-16by9 animate__animated animate__fadeInLeft">
          <iframe width="auto" height="auto" src={urlEmbed} frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
          </iframe>
        </div>
        <Card.Body className="animate__animated animate__fadeInRight">
          <Card.Link
            className="card-title"
            href={url}
            target="_blank">
            {title}
          </Card.Link>
          <div className="card-author">Shared by: {userCreated.username}

            {this.props.userId ? <Vote
              handleVoteUp={this.voteUp}
              handleVoteDown={this.voteDown}
              handleUnVote={this.unVote}
              votedUp={likes.includes(userId)}
              votedDown={disLikes.includes(userId)}
              videoId={id}/> :''}
            <div className="vote-count">

              <span className="like-count">{likes.length}</span><FontAwesomeIcon className="animate__animated animate__heartBeat animate__delay-1s" icon={faThumbsUp} fixedWidth />&nbsp;
              <span className="dislike-count">{disLikes.length}</span><FontAwesomeIcon className="animate__animated animate__heartBeat animate__delay-1s" icon={faThumbsDown} fixedWidth/>
            </div>
          </div>
          <Card.Text className="card-description">
            {description}
          </Card.Text>
        </Card.Body>
      </Col>
    );
  }
}
