import PropTypes from "prop-types";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import JobsList from "../Jobs/JobsList";
import ProductionInfoTab from "../Productions/ProductionInfoTab";
import SpaceAgreementFormForTheatersToggle from "../SpaceAgreements/SpaceAgreementFormForTheatersToggle";
import SpaceInfoTab from "../Spaces/SpaceInfoTab";
import { TheaterAuthContext } from "../Contexts";

class TheaterShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: "",
    };
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.theater.id);
  };

  handleSelect(key) {
    this.setState({
      key,
    });
  }

  render() {
    let spaceTabs;
    if (this.props.theater.spaces[0]) {
      spaceTabs = this.props.theater.spaces.map((space) => (
        <Tab
          eventKey={`space-${space.id}`}
          title={space.name}
          key={`space-${space.id}`}
        >
          <SpaceInfoTab space={space} />
        </Tab>
      ));
    } else {
      spaceTabs = <div>No spaces found</div>;
    }
    let productionTabs;
    if (this.props.theater.productions[0]) {
      productionTabs = this.props.theater.productions.map((production) => (
        <Tab
          eventKey={`production-${production.id}`}
          title={production.play ? production.play.title : "A Play"}
          key={`production-${production.id}`}
        >
          <ProductionInfoTab production={production} />
        </Tab>
      ));
    } else {
      productionTabs = <div>No productions found</div>;
    }
    return (
      <Col md={12}>
        <Row>
          <Col md={12} className="theater-profile">
            <h2>{this.props.theater.name}</h2>
            <p>
              <em>{this.props.theater.mission_statement}</em>
            </p>
            <p>
              {this.props.theater.street_address}
              <br />
              {this.props.theater.city}, {this.props.theater.state}{" "}
              {this.props.theater.zip}
              <br />
              {this.props.theater.phone_number}
              <br />
              <a href={"http://" + this.props.theater.website} target="_blank">
                {this.props.theater.website}
              </a>
            </p>
            <TheaterAuthContext.Consumer>
              {(value) => {
                if (value === "admin") {
                  return (
                    <span>
                      <span
                        className="right floated edit icon"
                        onClick={this.props.onEditClick}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </span>
                      <span
                        className="right floated trash icon"
                        onClick={this.handleDeleteClick}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </span>
                    </span>
                  );
                }
              }}
            </TheaterAuthContext.Consumer>
          </Col>
        </Row>
        <hr />
        <Row>
          <h2>Spaces</h2>
        </Row>
        <Row>
          <SpaceAgreementFormForTheatersToggle
            theater={this.props.theater}
            isOpen={false}
            onFormSubmit={this.props.onFormSubmit}
          />
        </Row>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="space-info-tabs"
        >
          {spaceTabs}
        </Tabs>
        <Row>
          <h2>Productions</h2>
        </Row>
        <div>
          <TheaterAuthContext.Consumer>
            {(value) => {
              if (value === "admin") {
                return (
                  <Link
                    to={`/productions/new?theaterId=${this.props.theater.id}`}
                  >
                    Add new production
                  </Link>
                );
              }
            }}
          </TheaterAuthContext.Consumer>
        </div>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="production-info-tabs"
        >
          {productionTabs}
        </Tabs>

        <TheaterAuthContext.Consumer>
          {(value) => {
            if (value === "member" || value === "admin") {
              return (
                <>
                  <Row>
                    <h2>Jobs</h2>
                  </Row>
                  <Row>
                    <JobsList theater={this.props.theater} />
                  </Row>
                </>
              );
            }
          }}
        </TheaterAuthContext.Consumer>
      </Col>
    );
  }
}
TheaterShow.propTypes = {
  theater: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default TheaterShow;
