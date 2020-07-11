import PropTypes from 'prop-types';
import {
  Button,
  Col,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'
import uuid from 'react-uuid'

class RehearsalContentShow extends Component {

  makeContentPretty = () => {
    let content = []
    if (this.props.acts){
      this.props.acts.map((item) =>
        content.push(item.heading)
      )
    }
    if (this.props.scenes) {
      this.props.scenes.map((item) =>
        content.push(item.pretty_name))
    }
    if (this.props.french_scenes){
      this.props.french_scenes.map((item) =>
        content.push(item.pretty_name)
      )
    }

    return content.map((item) => <li key={uuid()}>{item}</li>)
  }

  render() {
    let content = this.makeContentPretty()
    return (
      <Col md={12}>
        <h2>Planned Content:</h2>
        <ul>
          {content}
        </ul>
        <Button onClick={this.props.handleEditClick}>Edit content</Button>
      </Col>
    )
  }
}

RehearsalContentShow.propTypes = {
  acts: PropTypes.array,
  french_scenes: PropTypes.array,
  hiredUsers: PropTypes.array.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  scenes: PropTypes.array

}

export default RehearsalContentShow
