import React, {
  Component
} from 'react'
import PropTypes from 'prop-types';

import {
  Form,
} from 'react-bootstrap'

class LineEditForm extends Component {
  state = {
      line: this.props.line,
  }

  onChange (e) {
    if (e.key == 'Enter') {
      this.submitForm()
    }
    this.setState({
      line: {
        ...this.state.line,
        id: this.state.line.id,
        new_content: e.target.value,
      }
    })
  }

  submitForm = () => {
    this.props.onSubmit(this.state.line)
  }

  render() {
    return (
      <Form controlid="lineEditForm" onSubmit={e => { e.preventDefault(); }} >
        <Form.Control value={this.state.line.new_content || this.state.line.original_content || ''} onKeyDown={(evt) => this.onChange(evt)} onChange={(evt) => this.onChange(evt)} onBlur={this.submitForm}/>
      </Form>
    )
  }
}

LineEditForm.propTypes = {
  line: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default LineEditForm
