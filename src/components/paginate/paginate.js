import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import videoServices from '../../services/videoServices';
import './paginate.css';

export default class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
    };
    this.handlePageClick = this
        .handlePageClick
        .bind(this);
  }
  receivedData() {
    console.log(this.state);
    videoServices.getListVideo(this.state.offset, this.state.offset + this.state.perPage).then(async (data) => {
      const postData = data.map((pd, i) => <React.Fragment key={i}>
        <p>{pd.title}</p>
        <img src={pd.thumbnailUrl} alt="" />
      </React.Fragment>);

      const videoCount = parseInt(await videoServices.getVideoCount());
      console.log('video count: ' + videoCount);
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
