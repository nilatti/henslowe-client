import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { buildUserName } from "../../utils/actorUtils";

import { getJobs } from "../../api/jobs";

class JobsList extends Component {
  constructor(props) {
    super(props);
    let production;
    let specialization;
    let theater;
    let user;
    if (this.props.production) {
      production = this.props.production;
      theater = this.props.production.theater;
    }
    if (this.props.specialization_id) {
      specialization = this.props.specialization_id;
    }

    if (this.props.theater) {
      theater = this.props.theater;
    }

    if (this.props.user) {
      user = this.props.user;
    }

    this.state = {
      jobs: [],
      production: production,
      theater: theater,
      specialization_id: specialization,
      user: user,
    };
  }

  componentDidMount() {
    this.loadJobsFromServer();
  }

  async loadJobsFromServer() {
    let production_id = this.props.production ? this.props.production.id : "";
    let specialization_id = this.props.specialization_id
      ? this.props.specialization_id
      : "";
    let theater_id = this.props.theater ? this.props.theater.id : "";
    let user_id = this.props.user ? this.props.user.id : "";
    const response = await getJobs({
      production_id: production_id,
      specialization_id: specialization_id,
      theater_id: theater_id,
      user_id: user_id,
    });

    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error fetching jobs",
      });
    } else {
      this.setState({
        jobs: _.orderBy(response.data, [
          "user.last_name",
          "user.first_name",
          "production.id",
          "theater.name",
          "specialization_id",
        ]),
      });
    }
  }

  render() {
    let productionSet = this.props.production !== undefined ? true : false;
    // console.log(this.state.jobs[0]);
    // let jobs = this.state.jobs.map((job) => (
    //   <li key={job.id}>
    //     <Link to={`/jobs/${job.id}`}>
    //       {job.user ? buildUserName(job.user) : <></>}:{" "}
    //       {job.specialization.title} at {job.theater.name}{" "}
    //       <em>{job.production ? job.production.play.title : <></>}</em>
    //     </Link>
    //   </li>
    // ));
    return (
      <div>
        {/* <ul>{jobs}</ul> */}
        <Link
          to={{
            pathname: "/jobs/new",
            state: {
              production: this.props.production,
              productionSet: productionSet,
              theater: this.props.theater,
              user: this.props.user,
            },
          }}
        >
          Add New
        </Link>
      </div>
    );
  }
}

JobsList.propTypes = {
  // production: PropTypes.object.isRequired,
};

export default JobsList;
