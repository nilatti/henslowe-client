import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form
} from 'react-bootstrap'
import {
  Typeahead
} from 'react-bootstrap-typeahead';
import 'react-select/dist/react-select.css';

import {
  getTheaters
} from '../../api/theaters'

class SpaceAgreementFormForSpaces extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_theaters: this.props.space.theaters,
      available_theaters: []
    }
  }

  componentDidMount = () => {
    this.loadTheatersFromServer()
  }

  handleChange = (selected) => {
    this.setState({
      selected_theaters: selected
    })
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.processSubmit()
    }
  }

  processSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.space.id,
      theater_ids: this.state.selected_theaters.map((theater) => theater.id)
    })
  }

  async loadTheatersFromServer() {
    const response = await getTheaters()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching spaces'
      })
    } else {
      this.setState({
        available_theaters: response.data
      })
    }
  }

  render() {
    if (!this.state.available_theaters) {
      return <div>Loading theaters</div>
    }

    var available_theaters = this.state.available_theaters.map((theater) => ({
      id: theater.id,
      label: String(theater.name)
    }))

    var selected_theaters = this.state.selected_theaters.map((theater) => ({
      id: theater.id,
      label: String(theater.name)
    }))

    return (
      <Col md={{ span: 8, offset: 2 }}>
        <Form
          onSubmit={e => this.handleSubmit(e)}
        >

        <Typeahead
          defaultSelected={selected_theaters}
          id="theaters"
          multiple={true}
          options={available_theaters}
          onChange={(selected) => {
            this.handleChange(selected)
          }}
          placeholder="Choose the theaters you work with..."
        />

						<Button
							type="submit"
							variant="primary"
						>
							Submit
						</Button>
						<Button
							type="button"
              variant="outline-primary"
							onClick={this.props.onFormClose}
						>
							Cancel
						</Button>
					</Form>
					<hr />
				</Col>
    )
  }
}

SpaceAgreementFormForSpaces.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  space: PropTypes.object.isRequired,
}

export default SpaceAgreementFormForSpaces
