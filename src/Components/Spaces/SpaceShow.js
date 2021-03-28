import PropTypes from "prop-types";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import React, { Component } from "react";

import SpaceAgreementFormForSpacesToggle from "../SpaceAgreements/SpaceAgreementFormForSpacesToggle";
import TheaterInfoTab from "../Theaters/TheaterInfoTab";

import { SpaceAuthContext } from "../Contexts";

class SpaceShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: "",
    };
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id);
  };

  handleSelect(key) {
    this.setState({
      key,
    });
  }

  render() {
    let theaterTabs;
    if (this.props.space.theaters[0]) {
      theaterTabs = this.props.space.theaters.map((theater) => (
        <Tab
          eventKey={`theater-${theater.id}`}
          title={theater.name}
          key={`theater-${theater.id}`}
        >
          <TheaterInfoTab theater={theater} />
        </Tab>
      ));
    } else {
      theaterTabs = <div>No theaters found</div>;
    }

    return (
      <Col md={12}>
        <Row>
          <Col md={12} className="space-profile">
            <h2>{this.props.space.name}</h2>
            <p>
              <em>{this.props.space.mission_statement}</em>
            </p>
            <p>
              {this.props.space.street_address}
              <br />
              {this.props.space.city}, {this.props.space.state}{" "}
              {this.props.space.zip}
              <br />
              {this.props.phone_number}
              <br />
              <a href={"http://" + this.props.space.website} target="_blank">
                {this.props.space.website}
              </a>
            </p>
            <SpaceAuthContext.Consumer>
              {(value) => {
                if (value === "theater_admin") {
                  return (
                    <>
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
                    </>
                  );
                }
              }}
            </SpaceAuthContext.Consumer>
          </Col>
        </Row>
        <hr />
        <Row>
          <h2>Theaters</h2>
        </Row>
        <SpaceAuthContext.Consumer>
          {(value) => {
            if (value === "admin") {
              return (
                <Row>
                  <SpaceAgreementFormForSpacesToggle
                    space={this.props.space}
                    isOpen={false}
                    onFormSubmit={this.props.onFormSubmit}
                  />
                </Row>
              );
            }
          }}
        </SpaceAuthContext.Consumer>

        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="theater-info-tabs"
        >
          {theaterTabs}
        </Tabs>
      </Col>
    );
  }
}

SpaceShow.propTypes = {
  space: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default SpaceShow;
