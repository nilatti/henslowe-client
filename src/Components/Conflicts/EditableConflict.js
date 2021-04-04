import PropTypes from "prop-types";
import React, { Component } from "react";

import ConflictForm from "./ConflictForm";
import ConflictShow from "./ConflictShow";

class EditableConflict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormOpen: false,
      conflict: null,
    };
  }

  handleEditClick = () => {
    this.toggleForm();
  };
  handleSubmit = (conflict) => {
    this.props.handleSubmit(conflict);
    this.toggleForm();
  };

  toggleForm = () => {
    this.setState({
      editFormOpen: !this.state.editFormOpen,
    });
  };

  render() {
    if (this.props.conflict === null) {
      return <div>Loading!</div>;
    }
    if (this.state.editFormOpen) {
      return (
        <ConflictForm
          conflict={this.props.conflict}
          isOpen={true}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.toggleForm}
        />
      );
    } else {
      return (
        <ConflictShow
          conflict={this.props.conflict}
          handleEditClick={this.handleEditClick}
          handleDeleteClick={this.props.handleDeleteClick}
          onFormSubmit={this.handleSubmit}
        />
      );
    }
  }
}

EditableConflict.propTypes = {
  conflict: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditableConflict;
