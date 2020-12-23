import React, {Component} from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import share from '../../services/shareVideoServices';
import Movie from '../Movie/Movie';

export default class SharePage extends Component {
  constructor(props) {
    super(props);
    this.state = {url: '', video: null, userCreated: null};
    this.shareVideo = this.shareVideo.bind(this);
  }

  async shareVideo(e) {
    e.preventDefault();
    const video = await share(this.state.url);
    if (video) {
      const userCreated = video.userCreated;
      video.userCreated = undefined;

      this.setState({
        video,
        userCreated,
      });
    }
  }

  render() {
    return (
      <Row className="share">
        <Col sm={12} md={{span: 6, offset: 3}}>
          <Card>
            <Card.Header as="h5">Share a Youtube movie</Card.Header>

            <Card.Body>
              <Form inline>
                <Form.Label htmlFor="inlineFormInputGroupVideoUrl">
                    Video URL
                </Form.Label>
                <InputGroup className="mb-2 mr-sm-2 ml-2">
                  <FormControl style={{minWidth: '300px', maxWidth: '100vw'}} id="inlineFormInputGroupVideoUrl" placeholder="Video URL"
                    value={this.state.url} onChange={(e) => {
                      this.setState({url: e.target.value});
                    }} />
                </InputGroup>
                <Button onClick={this.shareVideo} type="submit" className="mb-2">
                    Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {this.state.video ?
        <Col sm={12} md={{span: 6, offset: 3}}>
          <Movie video={this.state.video} userCreated={this.state.userCreated} />
        </Col> : ''}

      </Row>
    );
  }
}
