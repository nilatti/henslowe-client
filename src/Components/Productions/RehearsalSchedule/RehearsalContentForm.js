import _ from 'lodash'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap'

import {buildUserName} from '../../../utils/actorUtils'
import {unavailableUsers} from '../../../utils/rehearsalUtils'
import DraggableLists from '../../../utils/DraggableLists'

import {
  getPlayActOnStages,
  getPlayFrenchSceneOnStages,
  getPlaySceneOnStages,
} from '../../../api/plays.js'

class RehearsalContentForm extends Component {
  constructor(props) {
    super(props)
    let availableUsers = this.availableUsers(this.props.hiredUsers, this.props.rehearsal)

    this.state={
      acts: this.props.rehearsal.acts,
      frenchScenes: this.props.rehearsal.french_scenes,
      availableUsers: availableUsers,
      buttonsEnabled: false,
      calledUsers: this.props.rehearsal.users,
      content: [],
      contentNotToEdit:[],
      playContent: [],
      radiosEnabled: true,
      scenes: this.props.rehearsal.scenes,
    }
  }

  availableUsers(users, rehearsal) {
    let availableUsers = users.map((user) => {
      if (user.conflicts.length === 0) {
        return user
      } else {
        let conflicts_with_this_rehearsal = 0
        user.conflicts.map((conflict) => {
          if (conflict.start_time <= rehearsal.end_time && rehearsal.start_time <= conflict.end_time) {
            conflicts_with_this_rehearsal += 1
          }
        })
        if (conflicts_with_this_rehearsal <= 0) {
          return user
        }
      }
    })
    return availableUsers.filter(Boolean)
  }

  filterAlreadyScheduledContent = (playContent) => {
    let contentIds = this.state.content.map((item) => item.id)
    let filtered = playContent.map((item) => {
      if (_.includes(contentIds, item.id)) {
        return
      } else {
        return item
      }
    })
    return _.compact(filtered)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      buttonsEnabled: true,
    })
  }

  handleListChange = (listName, listContent) => {
    this.setState({
      [listName]: listContent
    })
  }

  listNotEditingContent = () => {
    let notEditing = []
    if (this.state.contentNotToEdit.french_scenes){
      this.state.contentNotToEdit.french_scenes.map((item) =>{
        notEditing = _.concat(notEditing, item.pretty_name)
      })
    }
    if (this.state.contentNotToEdit.scenes) {
      this.state.contentNotToEdit.scenes.map((item) =>{
        notEditing = _.concat(notEditing, item.pretty_name)})
    }
    if (this.state.contentNotToEdit.acts){
      this.state.contentNotToEdit.acts.map((item) =>{
      notEditing = _.concat(notEditing, item.heading)
      })
    }

    return _.join(notEditing, ', ')
  }

  loadOnStages = (e) => {
    e.preventDefault()
    if (this.state.textUnit === 'french_scene') {
      this.loadFrenchSceneOnStages(263)
      this.setNonworkingContent(['acts', 'scenes'])
      this.setWorkingContent('french_scenes')
    } else if (this.state.textUnit === 'scene') {
      this.loadSceneOnStages(263)
      this.setNonworkingContent(['french_scenes', 'acts'])
      this.setWorkingContent('scenes')
    } else if (this.state.textUnit === 'act') {
      this.loadActOnStages(263)
      this.setNonworkingContent(['french_scenes', 'scenes'])
      this.setWorkingContent('acts')
    }
  }

  mapOnStagesToUsers(users, onStages) {
    let calledUsers = this.state.content.map((item) => {
      return item.on_stages.map((onStage) => {
        return _.find(this.props.hiredUsers, ['id', onStage.user_id])
      })
    })
    calledUsers = _.flatten(calledUsers)
    calledUsers = _.uniq(calledUsers)
    return calledUsers
  }

  markContentRecommended(newPlayContent) {
    return newPlayContent.map((content) => {
      if (content.hasOwnProperty('isRecommended')) {
        return content
      } else {
        return {...content, isRecommended: true}
      }
    })
  }

  markContentUserUnavailable(newPlayContent, unavailableUsers){
    unavailableUsers.map((unavailableUser) => {
      newPlayContent = newPlayContent.map((item) => {
        let contentUsers = item.on_stages.map((on_stage) => on_stage.user_id)
        if (contentUsers.includes(unavailableUser.id)) {
          let reasonForRecommendation = ''
          if (item.reasonForRecommendation) { // tk add a thing t splice in and add more names if we have multiple "is not available"
            reasonForRecommendation += item.reasonForRecommendation
          }
          reasonForRecommendation += buildUserName(unavailableUser) + " is not available."
          return {...item, isRecommended: false, reasonForRecommendation: reasonForRecommendation}
        } else {
          return {...item, isRecommended: true}
        }
      })
    })
    return newPlayContent
  }

  markItemCallList(newPlayContent) {
    newPlayContent = newPlayContent.map((item) => {
      let callList = []
      let contentUsers = item.on_stages.map((on_stage) => on_stage.user_id)
      callList = _.concat(callList, contentUsers)
      callList = callList.map((userId) => {
        let user = _.find(this.props.hiredUsers, ['id', userId])
        return buildUserName(user)
      })
      callList = callList.sort()
      callList = callList.join(', ')
      return {...item, furtherInfo: callList} //this will let it easily pop into the furtherInfo slot in DraggableList
    })
    return newPlayContent
  }

  organizeContent(playContent) {
    let rehearsalUnavailableUsers = unavailableUsers(this.props.hiredUsers, this.props.rehearsal)
    let unavailableUsersMarked = this.markContentUserUnavailable(playContent, rehearsalUnavailableUsers)
    let recommendedContentMarked = this.markContentRecommended(unavailableUsersMarked)
    let withCallLists = this.markItemCallList(recommendedContentMarked)
    let filteredContent = this.filterAlreadyScheduledContent(withCallLists)
    this.setState({
      playContent: filteredContent
    })
  }

  processSubmit = () => {
    this.props.onFormClose()
    this.props.onFormSubmit({
      content: this.state.content,
      id: this.props.rehearsal.id,
      users: this.props.rehearsal.users
    }, "rehearsal")
  }

  setContent = (e) => {
    let newUsers = this.mapOnStagesToUsers(this.props.hiredUsers,this.state.content)
    let newRehearsal = {
      id: this.props.rehearsal.id,
      user_ids: newUsers.map((user) => user.id),
      [`${this.state.textUnit}_ids`]: this.state.content.map((item) => item.id)
    }
    this.props.onFormClose()
    this.props.onFormSubmit(newRehearsal, "rehearsal")
  }

  setNonworkingContent = (nonworkingContent) => { //arr
    let newNonworkingContent = {}
    nonworkingContent.map((item) => {
      newNonworkingContent[item] = this.props.rehearsal[item]
      }
    )
    this.setState({
      contentNotToEdit: newNonworkingContent
    })
  }

  setWorkingContent = (workingContentType) => { //string name of content type eg 'acts', 'scenes' etc
    let workingContent = this.props.rehearsal[workingContentType]
    if (workingContentType == 'french_scenes' || workingContentType == 'scenes') {
      workingContent.map((item) => item.heading = item.pretty_name)
    }
    let rehearsalUnavailableUsers = unavailableUsers(this.props.hiredUsers, this.props.rehearsal)
    let unavailableUsersMarked = this.markContentUserUnavailable(workingContent, rehearsalUnavailableUsers)
    let callListMarked = this.markItemCallList(unavailableUsersMarked)
    let recommendedContentMarked = this.markContentRecommended(callListMarked)
    this.setState({
      content: recommendedContentMarked
    })
  }

  async loadActOnStages(playId) {
    const response = await getPlayActOnStages(playId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving content'
      })
    } else {
      this.setState({playContent: response.data}, function() {
        this.organizeContent(response.data)
      })
    }
  }

  async loadFrenchSceneOnStages(playId) {
    const response = await getPlayFrenchSceneOnStages(playId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving content'
      })
    } else {
      let rehearsalUnavailableUsers = unavailableUsers(this.props.hiredUsers, this.props.rehearsal)
      let playContent = response.data.map((french_scene) => {
        let prettyName = french_scene.pretty_name
        return {
          ...french_scene, heading: french_scene.pretty_name
        }
      })
      this.setState({playContent: playContent}, function() {
          this.organizeContent(playContent)
        }
      )
    }
  }

  async loadSceneOnStages(playId) {
    const response = await getPlaySceneOnStages(playId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving content'
      })
    } else {
      let rehearsalUnavailableUsers = unavailableUsers(this.props.hiredUsers, this.props.rehearsal)
      let playContent = response.data.map((scene) => {
        let prettyName = scene.pretty_name
        return {
          ...scene, heading: scene.pretty_name
        }
      })
      this.setState({playContent: playContent}, function() {
        this.organizeContent(playContent)
      })
    }
  }

  render() {
    const {
      validated
    } = this.state
    if (this.state.playContent && this.state.playContent.length && this.state.playContent[0].hasOwnProperty('isRecommended')) {
      let listContents = [
        {
          listId: 'playContent',
          listContent: this.state.playContent,
          header: 'Don\'t rehearse'
        },
        {
          header: 'Rehearse',
          listId: 'content',
          listContent: this.state.content
        }
      ]
      let notEditing = this.listNotEditingContent()

      return(
        <Col>
          <Col>
            <p>
              Also rehearsing {notEditing}.
            </p>

          </Col>
          <Row>
            <DraggableLists
              listContents={listContents}
              handleListChange={this.handleListChange}
            />
          </Row>
          <Row>
            <Button onClick={this.setContent}>Schedule this content</Button>
          </Row>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Col>

      )
    }
    return (
      <Col md={ {
          span: 8,
          offset: 2
        } }>
      <h2>How do you want to schedule this rehearsal?</h2>
      <Form
        onSubmit={e => this.loadOnStages(e)}
      >
      <Form.Group as={Form.Row}>
        <Form.Label as="legend">
          Unit of text
        </Form.Label>
        <Col sm={10} className="form-radio">
          <Form.Check
            checked={this.state.textUnit === 'french_scene'}
            disabled={!this.state.radiosEnabled}
            id="french_scene"
            label="French Scene"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="french_scene"
          />
          <Form.Check
            checked={this.state.textUnit === 'scene'}
            disabled={!this.state.radiosEnabled}
            id="scene"
            label="Scene"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="scene"
          />
          <Form.Check
            checked={this.state.textUnit === 'act'}
            disabled={!this.state.radiosEnabled}
            id="act"
            label="Act"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="act"
          />
        </Col>
      </Form.Group>
      <Button disabled={!this.state.buttonsEnabled} type="submit" variant="primary" block>Load Text Options</Button>
      <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
    </Form>
  </Col>
    )
  }
}

RehearsalContentForm.propTypes = {
  hiredUsers: PropTypes.array.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  rehearsal: PropTypes.object.isRequired,
}

export default RehearsalContentForm
