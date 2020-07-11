import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {
  getAuthor,
  updateServerAuthor
} from '../../api/authors'

import AuthorForm from './AuthorForm'
import AuthorShow from './AuthorShow'

class EditableAuthor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      test: true,
      author: null,
    }
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false,
    })
  }

  componentDidMount = () => {
    this.loadAuthorFromServer(this.props.match.params.authorId)
  }
  componentDidUpdate(prevProps) {
    if (this.state.author === null || prevProps.match.params.authorId !== this.props.match.params.authorId) {
      this.loadAuthorFromServer(this.props.match.params.authorId);
    }
  }

  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }

  handleSubmit = (author) => {
    this.updateAuthorOnServer(author)
    this.closeForm()
  }

  async loadAuthorFromServer(authorId) {
    const response = await getAuthor(authorId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching author'
      })
    } else {
      this.setState({
        author: response.data
      })
    }
  }

  async updateAuthorOnServer(author) {
    const response = await updateServerAuthor(author)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating author'
      })
    } else {
      this.setState({
        author: response.data
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        author: null,
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
    if (this.state.author === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return (
        <AuthorForm
          author={this.state.author}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          isOpen={true}
        />
      )
    } else {
      return (
        <AuthorShow
        author={this.state.author}
        key={this.state.author.id}
        onEditClick={this.handleEditClick}
        onDeleteClick={this.props.onDeleteClick}
        />
      )
    }
  }
}

EditableAuthor.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default EditableAuthor