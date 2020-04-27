import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'

class SceneForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      end_page: this.props.scene.end_page || '',
      number: this.props.scene.number,
      start_page: this.props.scene.start_page || '',
      summary: this.props.scene.summary,
      validated: false,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.props.onFormClose()
      this.processSubmit()
    }
    this.setState({
      validated: true
    })
  }

  processSubmit = () => {
    this.props.onFormSubmit(this.props.actId,
      {
      act_id: this.props.actId,
      end_page: this.state.end_page,
      id: this.props.scene.id,
      number: this.state.number,
      start_page: this.state.start_page,
      summary: this.state.summary,
    })
  }

  render() {
    const {
      validated
    } = this.state
    return (
      <Col md={{ span: 8, offset: 2 }}>
        <Form
          noValidate
          onSubmit={e => this.handleSubmit(e)}
          validated={validated}
        >
          <Form.Row>
            <Col>
            <Form.Group controlId="number">
              <Form.Label>
                Scene Number
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="scene number"
                name="number"
                onChange={this.handleChange}
                pattern="[0-9]+"
                required
                value={this.state.number}
                />
                <Form.Control.Feedback type="invalid">
                  Scenes require numbers.
                </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="start_page">
                  <Form.Label>
                    Start Page
                  </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="starting page number"
                      name="start_page"
                      onChange={this.handleChange}
                      pattern="[0-9]+"
                      value={this.state.start_page}
                    />
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="end_page">
                  <Form.Label>
                    End Page
                  </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="ending page number"
                      name="end_page"
                      onChange={this.handleChange}
                      pattern="[0-9]+"
                      value={this.state.end_page}
                    />
                </Form.Group>
              </Col>
          </Form.Row>
          <Form.Group controlId="summary">
            <Form.Label>
              Summary
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="10"
              placeholder="summary"
              name="summary" value={this.state.summary} onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary" block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Form>
        <hr />
      </Col>
    )
  }
}

SceneForm.defaultProps = {
  scene: {
    number: '',
    summary: ''
  }
}

SceneForm.propTypes = {
  scene: PropTypes.object,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  actId: PropTypes.number.isRequired,
}

export default SceneForm
