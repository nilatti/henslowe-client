import PropTypes from "prop-types";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import {
  calculateLineCount,
  calculateRunTime,
} from "../../utils/playScriptUtils";

import { getProductionCopyComplete } from "../../api/plays";

import { useInterval } from "../../hooks/environmentUtils";

import ActorsList from "./Actors/ActorsList";
import AuditionersList from "../Jobs/AuditionersList";
import CastList from "../Jobs/CastList";
import JobsListExcludingActorsAndAuditioners from "../Jobs/JobsListExcludingActorsAndAuditioners";
import StageExitsList from "./SetDesign/StageExitsList";
import { ProductionAuthContext } from "../Contexts";

export default function ProductionShow({
  production,
  onEditClick,
  onDeleteClick,
  onFormSubmit,
}) {
  console.log(production);
  let [productionCopyComplete, setProductionCopyComplete] = useState(
    production.play.production_copy_complete
  );
  let [pollingInterval, setPollingInterval] = useState(
    production.play.production_copy_complete ? null : 1000
  );
  let { url } = useRouteMatch();
  let linesTotal =
    production.play.new_line_count || production.play.old_line_count || "";
  let runTime = 0;
  if (linesTotal > 0 && production.lines_per_minute) {
    runTime = (linesTotal / production.lines_per_minute).toFixed(2);
  }

  //check if the play is ready for interaction
  useInterval(async () => {
    let productionCopyCompleteData = await getProductionCopyComplete(
      production.play.id
    );
    setProductionCopyComplete(
      productionCopyCompleteData.data.production_copy_complete
    );
    if (productionCopyComplete) {
      setPollingInterval(null);
    }
  }, pollingInterval);
  return (
    <Col md={12}>
      <Row>
        <Col md={12} className="production-profile">
          <h2>
            {production.play ? (
              <Link to={`/plays/${production.play.id}`}>
                {production.play.title}
              </Link>
            ) : (
              "A Play"
            )}{" "}
            at{" "}
            {production.theater ? (
              <Link to={`/theaters/${production.theater.id}`}>
                {production.theater.name}
              </Link>
            ) : (
              "A Theater"
            )}
          </h2>
          <p>
            <em>
              {production.start_date} - {production.end_date}
            </em>
          </p>
          <ProductionAuthContext.Consumer>
            {(value) => {
              if (value === "admin") {
                return (
                  <>
                    <span
                      className="right floated edit icon"
                      onClick={onEditClick}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </span>
                    <span
                      className="right floated trash icon"
                      onClick={() => {
                        onDeleteClick(production.id);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </>
                );
              }
            }}
          </ProductionAuthContext.Consumer>
        </Col>
      </Row>
      <hr />
      {productionCopyComplete && (
        <Row>
          <Col md={12}>
            {production.lines_per_minute > 0 ? (
              <p>Lines per minute: {production.lines_per_minute}</p>
            ) : (
              <span></span>
            )}
            {linesTotal > 0 ? <p>Total lines: {linesTotal}</p> : <span></span>}
            {runTime ? <p>Run time: {runTime} minutes</p> : <span></span>}
            <Link to={`${url}/doubling_charts/`}>
              <Button variant="info">Show Doubling Charts</Button>
            </Link>
          </Col>
        </Row>
      )}
      <hr />
      <Row>
        <Col>
          <p>
            <Link to={`${url}/rehearsal_schedule`}>
              <Button>View Rehearsal Schedule</Button>
            </Link>
          </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>Production Jobs</h2>
        <JobsListExcludingActorsAndAuditioners production={production} />
      </Row>
      <hr />
      <ProductionAuthContext.Consumer>
        {(value) => {
          if (value === "admin") {
            return (
              <>
                <Row>
                  <h2>Auditioners</h2>
                  <div>
                    <b>
                      You have to add auditioners before you can cast the show
                    </b>
                  </div>
                  <AuditionersList production={production} />
                </Row>
                <hr />
              </>
            );
          }
        }}
      </ProductionAuthContext.Consumer>
      {productionCopyComplete && (
        <Row>
          <CastList production={production} />
        </Row>
      )}
      <hr />
      <Row>
        <Col md={12}>
          <ActorsList production={production} />
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>Set Design</h2>
      </Row>
      <Row>
        <StageExitsList productionId={production.id} />
      </Row>
    </Col>
  );
  // }
}

ProductionShow.propTypes = {
  production: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

// export default ProductionShow
