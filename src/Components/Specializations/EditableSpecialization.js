import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {
  getSpecialization,
  updateServerSpecialization
} from '../../api/specializations'

import SpecializationForm from './SpecializationForm'
import SpecializationShow from './SpecializationShow'

class EditableSpecialization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      specialization: null,
    }
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false,
    })
  }

  componentDidMount = () => {
    this.loadSpecializationFromServer(this.props.match.params.specializationId)
  }
  componentDidUpdate(prevProps) {
    if (this.state.specialization === null || prevProps.match.params.specializationId !== this.props.match.params.specializationId) {
      this.loadSpecializationFromServer(this.props.match.params.specializationId);
    }
  }

  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }

  handleSubmit = (specialization) => {
    this.updateSpecializationOnServer(specialization)
    this.closeForm()
  }

  async loadSpecializationFromServer(specializationId) {
    const response = await getSpecialization(specializationId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching specialization'
      })
    } else {
      this.setState({
        specialization: response.data
      })
    }
  }

  async updateSpecializationOnServer(specialization) {
    const response = await updateServerSpecialization(specialization)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating specialization'
      })
    } else {
      this.setState({
        specialization: response.data
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        specialization: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }

  openForm = () => {
    this.setState({
      editFormOpen: true
    })
  }

  render() {
    if (this.state.specialization === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return (
        <SpecializationForm
          specialization={this.state.specialization}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          isOpen={true}
        />
      )
    } else {
      return (
        <SpecializationShow
        specialization={this.state.specialization}
        onEditClick={this.handleEditClick}
        onDeleteClick={this.props.onDeleteClick}
        onFormSubmit={this.handleSubmit}
        />
      )
    }
  }
}

EditableSpecialization.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default EditableSpecialization
