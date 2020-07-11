import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {Button} from 'react-bootstrap'

import { RIEInput} from '@attently/riek'

import {
  createStageExit,
  deleteStageExit,
  getStageExits,
  updateServerStageExit
} from '../../../api/stage_exits'

import NewStageExitForm from './NewStageExitForm'
import {ProductionAuthContext} from '../../Contexts'

class StageExitsList extends Component {
  state = {
    newStageExitFormOpen: false,
    stageExits: [],
  }

  componentDidMount() {
    this.loadStageExitsFromServer()
  }

  createNewStageExit = (stageExit) => {
    this.createServerStageExit(stageExit)
    this.handleToggleClick()
  }

  handleToggleClick = () => {
    this.setState({newStageExitFormOpen: !this.state.newStageExitFormOpen})
  }

  onDeleteClick = (stageExitId) => {
    this.deleteStageExit(stageExitId)
  }

  onSave = (nameObj, stageExitId) => {
    let stageExitObj = {
      id: stageExitId,
      name: nameObj['name']
    }
    this.updateServerStageExit(stageExitObj)
  }

  async createServerStageExit(stageExit) {
    const response = await createStageExit(this.props.productionId, stageExit)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating stage exit'
      })
    } else {
      this.setState({
        stageExits: [...this.state.stageExits, response.data].sort((a, b) => (a.name > b.name) - (a.name < b.name))
      })
    }
  }

  async deleteStageExit(stageExitId) {
    const response = await deleteStageExit(stageExitId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting stage exit'
      })
    } else {
      this.setState({
        stageExits: this.state.stageExits.filter(stageExit =>
          stageExit.id !== stageExitId
        )
      })
    }
  }

  async loadStageExitsFromServer() {
    const response = await getStageExits(this.props.productionId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching stage exits'
      })
    } else {
      this.setState({
        stageExits: response.data
      })
    }
  }

  async updateServerStageExit(stageExitAttrs) {
    const response = await updateServerStageExit(stageExitAttrs)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating stage exits'
      })
    } else {
      this.setState(state => {
        const stageExitList = state.stageExits.map((stageExit) => {
          if (stageExit.id === stageExitAttrs.id) {
            return stageExitAttrs
          } else {
            return stageExit
          }
        })
        const stageExitListSorted = stageExitList.sort((a, b) => (a.name > b.name) - (a.name < b.name))
        return {
          stageExits: stageExitListSorted
        }
      })
    }
  }

  render() {
    let stageExits = this.state.stageExits.map(stageExit =>
      <li key={stageExit.id}>
        <ProductionAuthContext.Consumer>
        {(role) => {
          if (role === 'admin') {
            return (
              <>
              <RIEInput
                value={stageExit.name}
                change={(selected) => this.onSave(selected, stageExit.id)}
                propName='name'
              />
              <span className='right floated trash icon'
              onClick={() => this.onDeleteClick(stageExit.id)}
            >
              <i className="fas fa-trash-alt"></i>
            </span>
            </>
            )
          } else {
            return (
              <span>{stageExit.name}</span>
            )
        }
        }
        }
        </ProductionAuthContext.Consumer>

      </li>
    )
    return (
      <div>
        <h3>Stage Exits</h3>
        <ProductionAuthContext.Consumer>
          {(role) => {if (role === 'admin') {
            return (<p><em>Click to edit name</em></p>)
          }}}
        </ProductionAuthContext.Consumer>

        <ul>
          {stageExits}
        </ul>
        <ProductionAuthContext.Consumer>
          {(value) => {
            if (value === 'admin' && this.state.newStageExitFormOpen) {
              return (
                <NewStageExitForm
                  onFormClose={this.handleToggleClick}
                  onFormSubmit={this.createNewStageExit}
                  productionId={this.props.productionId}
                />
              )
            } else if (value === 'admin') {
              return (
                <Button
                  onClick={this.handleToggleClick}
                >
                  Add New
                </Button>
              )
            }
                }
            }
        </ProductionAuthContext.Consumer>


      </div>
    )
  }
}

StageExitsList.propTypes = {
  productionId: PropTypes.number.isRequired,
}

export default StageExitsList
