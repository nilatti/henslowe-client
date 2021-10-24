import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";

import { createJob, deleteJob } from "../../api/jobs";
import JobsList from "./ProductionJobsList";
import EditableJob from "./EditableJob";
import NewJob from "./NewJob";

class Jobs extends Component {
  async createJob(job) {
    const response = await createJob(job);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error creating Job",
      });
    } else {
      if (response.data.production_id) {
        this.props.history.push(`/productions/${response.data.production_id}`);
        window.location.reload();
      } else if (response.data.theater_id) {
        this.props.history.push(`/theaters/${response.data.theater_id}`);
        window.location.reload();
      } else if (response.data.user_id) {
        this.props.history.push(`/users/${response.data.user_id}`);
        window.location.reload();
      } else {
        this.props.history.push(`/jobs/${response.data.id}`);
        window.location.reload();
      }
    }
  }

  async deleteJob(jobId) {
    const response = await deleteJob(jobId);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error deleting Job",
      });
    } else {
      this.props.history.push("/jobs");
      window.location.reload();
    }
  }

  handleCreateFormSubmit = (job) => {
    this.createJob(job);
  };
  handleDeleteClick = (jobId) => {
    this.deleteJob(jobId);
  };

  render() {
    return (
      <Row>
        <Col md={12}>
          <div id="jobs">
            <h2>
              <Link to="/jobs">Jobs</Link>
            </h2>
            <hr />
            <Switch>
              <Route
                path="/jobs/new"
                render={(props) => (
                  <NewJob
                    {...props}
                    onFormSubmit={this.handleCreateFormSubmit}
                  />
                )}
              />
              <Route
                path={`/jobs/:jobId`}
                render={(props) => (
                  <EditableJob
                    {...props}
                    onDeleteClick={this.handleDeleteClick}
                  />
                )}
              />
              <Route path="/jobs/" component={JobsList} />
            </Switch>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Jobs;
