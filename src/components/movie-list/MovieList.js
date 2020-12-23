import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import Movie from '../movie/movie';
// import videoServices from '../../services/videoServices';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {listVideo: []};
  }
  async componentDidMount() {
    // const videos = await videoServices.getListVideo();
    // this.setState({listVideo: this.state.listVideo.concat(videos)});
  }
  render() {
  //   var productList = this.state.productList.map((product, i) =>
  //   <Product key={'product-' + i} name={product.name} handleShow={this.showProduct} handleTotal={this.addTotal} price={product.price} />
  // )
    return (
      <Row className="film-list">
        <Movie/>
        <Movie/>
        <Movie/>
      </Row>
    );
  }
}
