import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {
  getJob,
  updateServerJob
} from '../../api/jobs'

import JobForm from './JobForm'
import JobShow from './JobShow'

class EditableJob extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      job: null,
    }
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false,
    })
  }

  componentDidMount = () => {
    this.loadJobFromServer(this.props.match.params.jobId)
  }

  componentDidUpdate(prevProps) {
    if (this.state.job === null || prevProps.match.params.jobId !== this.props.match.params.jobId) {
      this.loadJobFromServer(this.props.match.params.jobId);
    }
  }

  handleEditClick = () => {
    this.openForm()
  }

  handleFormClose = () => {
    this.closeForm()
  }

  handleSubmit = (job) => {
    this.updateJobOnServer(job)
    this.closeForm()
  }

  async loadJobFromServer(jobId) {
    const response = await getJob(jobId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching job'
      })
    } else {
      this.setState({
        job: response.data
      })
    }
  }

  async updateJobOnServer(job) {
    const response = await updateServerJob(job)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating job'
      })
    } else {
      this.setState({
        job: response.data
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        job: null,
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
    if (this.state.job === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return (
        <JobForm
          job={this.state.job}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          isOpen={true}
        />
      )
    } else {
      return (
        <JobShow
        job={this.state.job}
        onEditClick={this.handleEditClick}
        onDeleteClick={this.props.onDeleteClick}
        onFormSubmit={this.handleSubmit}
        />
      )
    }
  }
}

EditableJob.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default EditableJob
