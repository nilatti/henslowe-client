import PropTypes from 'prop-types';
import React, {Component} from 'react'

class Text extends Component {

  render() {
    return(
      <div>
        {this.props.text.length}
        THIS IS SOME TEXT
      </div>
    )
  }
}

Text.propTypes = {
  text: PropTypes.object.isRequired,
}
export default Text
