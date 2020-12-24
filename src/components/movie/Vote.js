import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp as thumbVotedUp, faThumbsDown as thumbVotedDown} from '@fortawesome/free-solid-svg-icons';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-regular-svg-icons';

// import './movie.scss';

export default class Vote extends Component {
  constructor(props) {
    super(props);
    const {votedUp, votedDown, videoId} = this.props;
    this.state = {votedUp, votedDown, videoId};
  }
  render() {
    // voted up or down
    if (this.state.votedUp || this.state.votedDown) {
      return (
        <>
          {this.state.votedUp && <FontAwesomeIcon icon={thumbVotedUp} size="2x" />}
          {this.state.votedDown && <FontAwesomeIcon icon={thumbVotedDown} size="2x" />}
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
