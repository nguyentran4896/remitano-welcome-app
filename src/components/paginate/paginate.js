import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import helpers from '../../helpers/helpers';
import videoServices from '../../services/videoServices';
import Movie from '../movie/movie';
import './paginate.css';

export default class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 3,
      currentPage: 0,
    };
    this.handlePageClick = this
        .handlePageClick
        .bind(this);
  }
  receivedData() {
    videoServices.getListVideo(this.state.offset, this.state.offset + this.state.perPage).then(async (data) => {
      const postData = data
          .filter((video)=> !!helpers.getYoutubeIdFromUrl(video.url))
          .map((video, i) =>
            <Movie key={i} video={video} />,
          );

      const videoCountResp = await videoServices.getVideoCount();
      const videoCount = parseInt(videoCountResp);
      this.setState({
        pageCount: Math.ceil(videoCount / this.state.perPage),
        postData,
      });
    });
  }
  handlePageClick(e) {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset,
    }, () => {
      this.receivedData();
    });
  };

  componentDidMount() {
    this.receivedData();
  }
  render() {
    return (
      <div>
        {this.state.postData}
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'} />
      </div>

    );
  }
}
