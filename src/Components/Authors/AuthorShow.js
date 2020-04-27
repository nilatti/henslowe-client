import PropTypes from 'prop-types';
import {
  Row,
  Col
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import {
  createPlay
} from '../../api/plays'

import PlayFormToggle from '../Plays/PlayFormToggle'
import PlaysSubComponent from '../Plays/PlaysSubComponent'

class AuthorShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: this.props.author,
      plays: this.props.author.plays,
      playFormOpen: false,
    }
  }

  async createPlay(play) {
    const response = await createPlay(play)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating play'
      })
    } else {
      this.setState({
        plays: [...this.state.plays, response.data]
      })
    }
  }

  handleCreateFormSubmit = (play) => {
    this.createPlay(play)
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.author.id)
  }

  render() {
    let dates = this.state.author.birthdate //tk
    if (this.state.author.deathdate != null) {
      dates = dates.concat(" to " + this.state.author.deathdate)
    }

    return (
      <Col md={12}>
      <Row>
        <Col md={3} className="author-profile">
          <h3>
            {this.state.author.first_name} {this.state.author.middle_name} {this.state.author.last_name}
          </h3>
          <p>
            {dates}<br />
            {this.state.author.nationality}
          </p>
          <span
            className='right floated edit icon'
            onClick={this.props.onEditClick}
          >
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span
            className='right floated trash icon'
            onClick={this.handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </Col>
        <Col md={9}>
          <h2>Plays by {this.state.author.last_name}</h2>
          <PlaysSubComponent
            author_id={this.state.author.id}
            plays={this.state.plays}
          />
          <PlayFormToggle
            author_id={this.state.author.id}
            onFormSubmit={this.handleCreateFormSubmit}
            isOnAuthorPage={true}
            isOpen={this.state.playFormOpen}
          />
        </Col>
      </Row>
      <hr />
      </Col>
    )
  }
}

AuthorShow.propTypes = {
  author: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
}

export default AuthorShow