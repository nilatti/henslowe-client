import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Col,
} from 'react-bootstrap'
import DraggableList from './DraggableList'

const reorder = (listId, list, startIndex, endIndex) => {
  const returnObj = {
    [listId]: []
  }
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  returnObj[listId] = result
  return returnObj;
};

/**
* Moves an item from one list to another list.
*/
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

function getItemStyle (isDragging, isRecommended, draggableStyle) {
  let background = '#0D9AE5'
  let fontStyle = 'normal'
  if (!isRecommended) {
    background = '#b8bfba'
    fontStyle = 'italic'
  }
  return  {
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  fontStyle: fontStyle,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : background,

  // styles we need to apply on draggables
  ...draggableStyle
  }};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
});

class DraggableLists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listContents: {}
    }
    this.props.listContents.map((listContentItem) => {
      this.state = {...this.state, listContents: {
          ...this.state.listContents,
          [listContentItem.listId]: listContentItem.listContent
        },
        headers: {
          ...this.state.headers,
          [listContentItem.listId]: listContentItem.header
        }
      }}
    )
  }

  onDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            let sourceList = this.state.listContents[source.droppableId]
            const result = reorder(
                source.droppableId,
                sourceList,
                source.index,
                destination.index
            );
            this.updateStateLists(result)
        } else {
            let sourceList = this.state.listContents[source.droppableId]
            let destinationList = this.state.listContents[destination.droppableId]
            const result = move(
                sourceList,
                destinationList,
                source,
                destination,
            );
          this.updateStateLists(result)
        }
        this.props.handleListChange(source.droppableId, this.state.listContents[source.droppableId]) //assumes lists are held in state in the object above;
        this.props.handleListChange(destination.droppableId, this.state.listContents[destination.droppableId])
      };

    updateStateLists = (result) => {
      let newListContents = this.state.listContents
      Object.entries(result).forEach(([key, value]) => {
          newListContents[key] = value
        }
      )
      this.setState({
        listContents: newListContents
      })
    }

    render() {
      let draggableLists = Object.entries(this.state.listContents).map(([key, value]) =>
        (<Col key={key}>
            <h3>{this.state.headers[key]}</h3>
            <DraggableList
              key={key}
              getItemStyle={getItemStyle}
              getListStyle={getListStyle}
              listId={key}
              listContent={value}
            />
          </Col>
          )
      )
      return(
        <DragDropContext onDragEnd={this.onDragEnd}>
          {draggableLists}
        </DragDropContext>
      )
    }
}

DraggableLists.propTypes ={
  handleListChange: PropTypes.func.isRequired,
  listContents: PropTypes.array.isRequired, //list contents must be an array of objects [{listId: 'string', listContent: [array], heading: 'string'}]
}
export default DraggableLists
