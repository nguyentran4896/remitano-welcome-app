import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import helpers from '../../helpers/helpers';
import videoServices from '../../services/videoServices';
import Movie from '../Movie/Movie';
import './paginate.scss';

export default class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      postData: [],
      perPage: 3,
      currentPage: 0,
    };
    this.handlePageClick = this
        .handlePageClick
        .bind(this);
  }
  receivedData() {
    videoServices.getListVideo(this.state.offset, this.state.perPage).then(async (data) => {
      const postData = data
          .filter((video) => !!helpers.getYoutubeIdFromUrl(video.url))
          .map((video, i) => {
            const userCreated = video.userCreated;
            video.userCreated = undefined;
            return <Movie key={this.state.offset + i} video={video} userCreated={userCreated} userId={this.props.userId} />;
          },
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
    if (!this.state.postData.length) {
      return (<span className="animate__animated animate__fadeIn">No video shared yet!! Give it a try!</span>);
    }
    return (
      <div>
        {this.state.postData}
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          breakLabel={'...'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}

          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
        />
      </div>

    );
  }
}
