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
        <>
          {votedUp && <FontAwesomeIcon icon={thumbVotedUp} size="2x" />}
          {votedDown && <FontAwesomeIcon icon={thumbVotedDown} size="2x" />}
        </>
      );
    }

    // unvoted
    return (
      <>
        <a className="thumb-unvoted" onClick={this.props.handleVoteUp}>
          <FontAwesomeIcon icon={faThumbsUp} size="2x" />
        </a>

        <a className="thumb-unvoted" onClick={this.props.handleVoteDown}>
          <FontAwesomeIcon icon={faThumbsDown} size="2x" />
        </a>
      </>
    );
  }
}
