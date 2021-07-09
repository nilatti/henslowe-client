import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";

import { createProduction, deleteProduction } from "../../api/productions";
import ProductionsList from "./ProductionsList";
import EditableProduction from "./EditableProduction";
import ProductionRehearsalSchedule from "./RehearsalSchedule/ProductionRehearsalSchedule";

import NewProduction from "./NewProduction";

class Productions extends Component {
  async createProduction(production) {
    const response = await createProduction(production);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error creating Production",
      });
    } else {
      this.props.history.push(`/productions/${response.data.id}`);
      window.location.reload();
    }
  }

  async deleteProduction(productionId) {
    const response = await deleteProduction(productionId);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error deleting Production",
      });
    } else {
      this.props.history.push("/productions");
      window.location.reload();
    }
  }

  handleCreateFormSubmit = (production) => {
    this.createProduction(production);
  };
  handleDeleteClick = (productionId) => {
    this.deleteProduction(productionId);
  };

  render() {
    return (
      <Row>
        <Col md={12}>
          <div id="productions">
            <h2>
              <Link to="/productions">Productions</Link>
            </h2>
            <hr />
            <Switch>
              <Route
                path="/productions/new"
                render={(props) => (
                  <NewProduction
                    {...props}
                    onFormSubmit={this.handleCreateFormSubmit}
                  />
                )}
              />
              <Route path={`/productions/:productionId/rehearsal_schedule`}>
                <ProductionRehearsalSchedule />
              </Route>
              <Route
                path={`/productions/:productionId`}
                render={(props) => (
                  <EditableProduction
                    {...props}
                    onDeleteClick={this.handleDeleteClick}
                  />
                )}
              />
              <Route path="/productions/" component={ProductionsList} />
            </Switch>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Productions;
