import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {
  getProduction,
  updateServerProduction
} from '../../api/productions'

import EditProductionForm from './EditProductionForm'
import ProductionShow from './ProductionShow'
import {getUserRoleForProduction} from '../../utils/authorizationUtils'
import {ProductionAuthContext} from '../Contexts'


class EditableProduction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      production: null,
      userRole: null,
    }
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false,
    })
  }

  componentDidMount = () => {
    this.loadProductionFromServer(this.props.match.params.productionId)
  }

  componentDidUpdate(prevProps) {
    if (this.state.production === null || prevProps.match.params.productionId !== this.props.match.params.productionId) {
      this.loadProductionFromServer(this.props.match.params.productionId);
    }
  }

  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }

  handleSubmit = (production) => {
    this.updateProductionOnServer(production)
    this.closeForm()
  }

  setUserAuth (user, production) {
    if (user) {
      this.setState({userRole: getUserRoleForProduction(user, production)})
    }
  }

  async loadProductionFromServer(productionId) {
    const response = await getProduction(productionId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching production'
      })
    } else {
      this.setState({
        production: response.data
      }, function() {
        this.setUserAuth(JSON.parse(window.localStorage.getItem('user')), this.state.production)
      })
    }
  }

  async updateProductionOnServer(production) {
    const response = await updateServerProduction(production)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating production'
      })
    } else {
      this.setState({
        production: response.data
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        Production: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }

  openForm = () => {
    this.setState({
      editFormOpen: true
    })
  }

  render() {
    if (this.state.production === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return (
        <EditProductionForm
          production={this.state.production}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          isOpen={true}
        />
      )
    } else {
      return (
        <ProductionAuthContext.Provider
          value={this.state.userRole}
        >
          <ProductionShow
          production={this.state.production}
          onEditClick={this.handleEditClick}
          onDeleteClick={this.props.onDeleteClick}
          onFormSubmit={this.handleSubmit}
          />
        </ProductionAuthContext.Provider>
      )
    }
  }
}

EditableProduction.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default EditableProduction
