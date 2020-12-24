import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp as thumbVotedUp, faThumbsDown as thumbVotedDown} from '@fortawesome/free-solid-svg-icons';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-regular-svg-icons';

// import './movie.scss';

export default class Vote extends Component {
  render() {
    const {votedUp, votedDown} = this.props;

    // voted up or down
    if (votedUp || votedDown) {
      return (
        <a className="thumb-voted" onClick={this.props.handleUnVote}>
          {votedUp && <FontAwesomeIcon className="animate__animated animate__rubberBand" icon={thumbVotedUp} size="2x" />}
          {votedDown && <FontAwesomeIcon className="animate__animated animate__rubberBand" icon={thumbVotedDown} size="2x" />}
        </a>
      );
    }

    // unvoted
    return (
      <>
        <a className="thumb-unvoted" onClick={this.props.handleVoteUp}>
          <FontAwesomeIcon className="animate__animated animate__swing" icon={faThumbsUp} size="2x" />
        </a>

        <a className="thumb-unvoted" onClick={this.props.handleVoteDown}>
          <FontAwesomeIcon className="animate__animated animate__swing" icon={faThumbsDown} size="2x" />
        </a>
      </>
    );
  }
}
