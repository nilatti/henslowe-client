import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class DraggableList extends Component {
  render() {
    return (
      <Droppable droppableId={this.props.listId} key={this.props.listId}>
          {(provided, snapshot) => (
              <div
                  ref={provided.innerRef}
                  style={this.props.getListStyle(snapshot.isDraggingOver)}>
                  {this.props.listContent.map((item, index) => (
                      <Draggable
                          key={item.id}
                          draggableId={`${item.id}`}
                          index={index}>
                          {(provided, snapshot) => (
                              <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={this.props.getItemStyle(
                                      snapshot.isDragging,
                                      item.isRecommended,
                                      provided.draggableProps.style
                                  )}>
                                  <span className="draggable-item-heading">{item.heading}</span><br />
                                  <span className="draggable-reason-for-recommendation">{item.reasonForRecommendation}</span><br />
                                  <span className="draggable-further-info">{item.furtherInfo}</span>
                              </div>
                          )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
              </div>
          )}
      </Droppable>
    )
  }
}

DraggableList.propTypes={
  getListStyle: PropTypes.func.isRequired,
  getItemStyle: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  listContent: PropTypes.array.isRequired,
}

export default DraggableList
