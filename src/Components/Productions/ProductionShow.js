import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import {
  calculateLineCount,
  calculateRunTime,
} from '../../utils/playScriptUtils'

import ActorsList from './Actors/ActorsList'
import AuditionersList from '../Jobs/AuditionersList'
import CastList from '../Jobs/CastList'
import JobsListExcludingActorsAndAuditioners from '../Jobs/JobsListExcludingActorsAndAuditioners'
import StageExitsList from './SetDesign/StageExitsList'
import {ProductionAuthContext} from '../Contexts'

export default function ProductionShow (props) {
    let { url } = useRouteMatch();
    let linesTotal = props.production.play.new_line_count || props.production.play.old_line_count || ""
    let runTime = 0;
    if (linesTotal > 0 && props.production.lines_per_minute) {
      runTime = (linesTotal/ props.production.lines_per_minute).toFixed(2)
    }
    return (
      <Col md={12}>
      <Row>
        <Col md={12} className="production-profile">
          <h2>
            {
              props.production.play ?
              <Link to={`/plays/${props.production.play.id}`}>
                {props.production.play.title}
              </Link>
              :
              'A Play'
            } at {
              props.production.theater ?
              <Link to={`/theaters/${props.production.theater.id}`}>
                {props.production.theater.name}
              </Link>
              : 'A Theater'
            }
          </h2>
          <p><em>{props.production.start_date} - {props.production.end_date}</em></p>
          <ProductionAuthContext.Consumer>
          {(value) => {
            if (value === 'admin') {
              return (
                <>
                <span
                  className='right floated edit icon'
                  onClick={props.onEditClick}
                >
                  <i className="fas fa-pencil-alt"></i>
                </span>
                <span
                  className='right floated trash icon'
                  onClick={() => {props.onDeleteClick(props.production.id)}}
                >
                  <i className="fas fa-trash-alt"></i>
                </span>
                </>
              )
            }
          }
          }
          </ProductionAuthContext.Consumer>

        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={12}>
          {props.production.lines_per_minute > 0 ?
            <p>Lines per minute: {props.production.lines_per_minute}</p>
            :
            <span></span>
          }
          {
            linesTotal > 0 ?
            <p>Total lines: {linesTotal}</p>
            :
            <span></span>
          }
          {
            runTime ?
            <p>Run time: {runTime} minutes</p>
            :
            <span></span>
          }
          <Link to={`${url}/doubling_charts/`}>
            <Button variant="info">
              Show Doubling Charts
            </Button>
          </Link>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <p>
            <Link to={`${url}/rehearsal_schedule`}><Button>View Rehearsal Schedule</Button></Link>
          </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>Production Jobs</h2>
        <JobsListExcludingActorsAndAuditioners production={props.production} />
      </Row>
      <hr />
      <ProductionAuthContext.Consumer>
      {(value) => {
        if (value === 'admin') {
          return (
            <>
            <Row>
              <h2>Auditioners</h2>
              <div><b>You have to add auditioners before you can cast the show</b></div>
              <AuditionersList production={props.production} />
            </Row>
            <hr/>
            </>
          )
        }
      }
      }
      </ProductionAuthContext.Consumer>
      <Row>
        <CastList production={props.production} />
      </Row>
      <hr />
      <Row>
        <Col md={12}>
          <ActorsList production={props.production} />
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>
          Set Design
        </h2>
      </Row>
      <Row>
        <StageExitsList productionId={props.production.id}/>
      </Row>
      </Col>
    )
  // }
}

ProductionShow.propTypes = {
  production: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
}

// export default ProductionShow
