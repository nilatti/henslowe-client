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
  getSpaces
} from '../../api/spaces'

class SpaceAgreementFormForTheaters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_spaces: this.props.theater.spaces,
      available_spaces: []
    }
  }

  componentDidMount = () => {
    this.loadSpacesFromServer()
  }

  handleChange = (selected) => {
    this.setState({
      selected_spaces: selected
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
      id: this.props.theater.id,
      space_ids: this.state.selected_spaces.map((space) => space.id)
    })
  }

  async loadSpacesFromServer() {
    const response = await getSpaces()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching spaces'
      })
    } else {
      this.setState({
        available_spaces: response.data
      })
    }
  }

  render() {
    if (!this.state.available_spaces) {
      return <div>Loading spaces</div>
    }

    var available_spaces = this.state.available_spaces.map((space) => ({
      id: space.id,
      label: String(space.name)
    }))

    var selected_spaces = this.state.selected_spaces.map((space) => ({
      id: space.id,
      label: String(space.name)
    }))

    return (
      <Col md={{ span: 8, offset: 2 }}>
        <Form
          onSubmit={e => this.handleSubmit(e)}
        >

        <Typeahead
          defaultSelected={selected_spaces}
          id="spaces"
          multiple={true}
          options={available_spaces}
          onChange={(selected) => {
            this.handleChange(selected)
          }}
          placeholder="Choose the spaces you work with..."
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

SpaceAgreementFormForTheaters.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  theater: PropTypes.object.isRequired,
}

export default SpaceAgreementFormForTheaters
