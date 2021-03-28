import Moment from "react-moment";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import React, { Component } from "react";

class ConflictShow extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.conflict.id);
  };

  render() {
    return (
      <Col md={12}>
        <Moment format="h:mm A MMM D, YYYY">
          {this.props.conflict.start_time}
        </Moment>
        -
        <Moment format="h:mm A MMM D, YYYY">
          {this.props.conflict.end_time}
        </Moment>{" "}
        ({this.props.conflict.category}){" "}
        <span
          className="right floated edit icon"
          onClick={this.props.handleEditClick}
        >
          <i className="fas fa-pencil-alt"></i>
        </span>
        <span
          className="right floated trash icon"
          onClick={this.handleDeleteClick}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
      </Col>
    );
  }
}

ConflictShow.propTypes = {
  conflict: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default ConflictShow;
