import PropTypes from "prop-types";

import React, { Component } from "react";

import UserForm from "./UserForm";

class NewUser extends Component {
  render() {
    return (
      <UserForm
        user={{}}
        onFormSubmit={this.props.onFormSubmit}
        onFormClose={this.props.onFormClose}
      />
    );
  }
}

NewUser.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
};

export default NewUser;
