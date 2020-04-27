import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'

import CharacterSelect from '../../../../Characters/CharacterSelect'

class NewOnStageForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characters: this.props.play.characters,
      description: '',
      nonspeaking: false,
      selectedCharacter: [],
      validated: false,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChangeCharacter = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedCharacter: [e[0]]
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.processSubmit()
    }
    this.setState({
      validated: true
    })
    this.props.onFormClose()
  }

  processSubmit = () => {
    this.props.onFormSubmit(this.props.actId, this.props.sceneId, this.props.frenchSceneId, {
      character_id: this.state.selectedCharacter[0].id,
      character_name: this.state.selectedCharacter[0].label,
      description: this.state.description,
      french_scene_id: this.props.frenchSceneId,
      nonspeaking: this.state.nonspeaking,
    }, "on_stage")
  }

  render() {
    var characters = this.state.characters.map((character) => ({
      id: character.id,
      label: character.name
    }))
    const {
      validated
    } = this.state
    return (<Col md = {{span: 8, offset: 2}}>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
      <CharacterSelect
        characters={characters}
        handleChangeCharacter={this.handleChangeCharacter}
        selectedCharacter={this.state.selectedCharacter}
      />
      <Form.Group>
        <Form.Label>
          Description
        </Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        >
        </Form.Control>
      </Form.Group>
      <Button type="submit" variant="primary" block>Submit</Button>
      <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
    </Form> <hr />
    </Col>)
  }
}

NewOnStageForm.propTypes = {
  actId: PropTypes.number.isRequired,
  characters: PropTypes.array.isRequired,
  frenchSceneId: PropTypes.number.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
}


export default NewOnStageForm
