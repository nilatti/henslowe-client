import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Row
} from 'react-bootstrap'
import {
  Route,
  Switch
} from 'react-router-dom'
import {
  Redirect
} from 'react-router-dom'

import EditableActsList from './EditableActsList'
import EditableAct from './EditableAct'
import ActFormToggle from './ActFormToggle'

import {
  deleteAct
} from '../../../api/acts'

class Acts extends Component {
  state = {
    acts: this.props.acts,
    errorStatus: '',
  }

  async deleteAct(actId) {
    const response = await deleteAct(actId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting act'
      })
    } else {
      this.setState({
        acts: this.state.acts.filter(act =>
          act.id != actId
        )
      })
    }
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div>
            <h2>Acts</h2>
            <Switch>
            <Route
              path={`/plays/:playId/acts/:actId`}
              render={(props) => (
                <EditableAct
                  {...props}
                  onDeleteClick={this.props.onDeleteClick}
                />
              )}
            />
            <Route
              path={`/plays/:playId`}
              render={(props) => (
                <EditableActsList acts={this.props.acts} onDeleteClick={this.props.onDeleteClick} play_id={this.props.play_id} />
              )}
            />
            </Switch>
          </div>
        </Col>
        <hr />
      </Row>
    )
  }
}

Acts.propTypes = {
  acts: PropTypes.array.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
}

export default Acts