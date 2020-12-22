import React, {Component} from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import share from '../../services/shareVideoServices';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {url: ''};
    this.shareVideo = this.shareVideo.bind(this);
  }
  shareVideo() {
    share(this.state.url);
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

      </Row>
    );
  }
}
