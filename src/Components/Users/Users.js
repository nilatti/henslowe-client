import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";

import { createUser, deleteUser } from "../../api/users";
import UsersList from "./UsersList";
import EditableUser from "./EditableUser";
import NewUser from "./NewUser";

class Users extends Component {
  async createUser(user) {
    const response = await (createUser(user),
    {
      timeout: 1000,
    });
    if (!response) {
      return;
    }
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error creating User",
      });
    } else {
      this.props.history.push(`/users/`);
      window.location.reload();
    }
  }

  async deleteUser(userId) {
    const response = await deleteUser(userId);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error deleting User",
      });
    } else {
      this.props.history.push("/users");
      window.location.reload();
    }
  }

  handleCreateFormClose = () => {
    this.props.history.push("/users");
    window.location.reload();
  };

  handleCreateFormSubmit = (user) => {
    this.createUser(user);
  };
  handleDeleteClick = (userId) => {
    this.deleteUser(userId);
  };

  render() {
    return (
      <Row>
        <Col md={12}>
          <div id="users">
            <h2>
              <Link to="/users">Users</Link>
            </h2>
            <hr />
            <Switch>
              <Route
                path="/users/new"
                render={(props) => (
                  <NewUser
                    {...props}
                    onFormSubmit={this.handleCreateFormSubmit}
                    onFormClose={this.handleCreateFormClose}
                  />
                )}
              />
              <Route
                path={`/users/:userId`}
                render={(props) => (
                  <EditableUser
                    {...props}
                    onDeleteClick={this.handleDeleteClick}
                  />
                )}
              />
              <Route path="/users/" component={UsersList} />
            </Switch>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Users;
