import _ from 'lodash'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import RehearsalForm from './RehearsalForm'
import RehearsalShow from './RehearsalShow'

class EditableRehearsal extends Component {
  constructor(props) {
    super(props)
    let hiredJobs = _.filter(this.props.production.jobs, function(o){ return o.specialization_id !== 4})
    let hiredUsers = hiredJobs.map((job) => job.user)
    hiredUsers = _.uniq(hiredUsers)
    this.myRef = React.createRef();
    this.state = {
      hiredUsers: hiredUsers,
      editFormOpen: false,
    }
  }

  handleEditClick = () => {
    this.toggleForm()
  }

  handleSubmit = (rehearsal) => {
    this.props.handleSubmit(rehearsal)
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
        <RehearsalForm
          rehearsal={this.props.rehearsal}
          isOpen={true}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.toggleForm}
          production={this.props.production}
        />
      )
    } else {
      return (
        <RehearsalShow
        hiredUsers={this.state.hiredUsers}
        rehearsal={this.props.rehearsal}
        ref={this.myRef}
        handleEditClick={this.handleEditClick}
        handleDeleteClick={this.props.handleDeleteClick}
        onFormSubmit={this.props.handleSubmit}
        production={this.props.production}
        />
      )
    }
  }
}

EditableRehearsal.propTypes = {
  rehearsal: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  production: PropTypes.object.isRequired,
}

export default EditableRehearsal
