import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import RehearsalContentForm from './RehearsalContentForm'
import RehearsalContentShow from './RehearsalContentShow'

class EditableRehearsalContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
    }
  }

  handleEditClick = () => {
    this.toggleForm()
  }
  handleSubmit = (conflict) => {
    this.props.handleSubmit(conflict)
    this.toggleForm()
  }

  toggleForm = () => {
    this.setState({
      editFormOpen: !this.state.editFormOpen
    })
  }

  render() {
      if (this.props.rehearsal === null) {
        return (
          <div>Loading!</div>
        )
      }
      if (this.state.editFormOpen) {
        return (
          <RehearsalContentForm
            hiredUsers={this.props.hiredUsers}
            rehearsal={this.props.rehearsal}
            isOpen={this.state.editFormOpen}
            onFormSubmit={this.props.onFormSubmit}
            onFormClose={this.toggleForm}
          />
        )
      } else {
        return (
          <RehearsalContentShow
            acts={this.props.rehearsal.acts}
            french_scenes={this.props.rehearsal.french_scenes}
            hiredUsers={this.props.hiredUsers}
            handleEditClick={this.handleEditClick}
            handleDeleteClick={this.props.handleDeleteClick}
            onFormSubmit={this.handleSubmit}
            scenes={this.props.rehearsal.scenes}
          />
        )
      }
  }
}

EditableRehearsalContent.propTypes = {
  hiredUsers: PropTypes.array.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  rehearsal: PropTypes.object.isRequired,
}

export default EditableRehearsalContent
