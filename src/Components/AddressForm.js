import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Form,
} from 'react-bootstrap'

class AddressForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event) => {
    this.props.onChange(
      event
    )
  }

  setNewValue(newState) {
    let val = {
      target: {
        name: "state",
        value: newState,
      }
    }
    this.handleChange(val)
  }

  render() {
    const {
      city,
      state,
      street_address,
      zip,
    } = this.props
    const states_array = [
      {
        name: "Alabama",
        abbr: "AL"
      },
      {
        name: "Alaska",
        abbr: "AK"
      },
      {
        name: "Arizona",
        abbr: "AZ"
      },
      {
        name: "Arkansas",
        abbr: "AR"
      },
      {
        name: "California",
        abbr: "CA"
      },
      {
        name: "Colorado",
        abbr: "CO"
      },
      {
        name: "Connecticut",
        abbr: "CT"
      },
      {
        name: "Delaware",
        abbr: "DE"
      },
      {
        name: "Florida",
        abbr: "FL"
      },
      {
        name: "Georgia",
        abbr: "GA"
      },
      {
        name: "Hawaii",
        abbr: "HI"
      },
      {
        name: "Idaho",
        abbr: "ID"
      },
      {
        name: "Illinois",
        abbr: "IL"
      },
      {
        name: "Indiana",
        abbr: "IN"
      },
      {
        name: "Iowa",
        abbr: "IA"
      },
      {
        name: "Kansas",
        abbr: "KS"
      },
      {
        name: "Kentucky",
        abbr: "KY"
      },
      {
        name: "Louisiana",
        abbr: "LA"
      },
      {
        name: "Maine",
        abbr: "ME"
      },
      {
        name: "Maryland",
        abbr: "MD"
      },
      {
        name: "Massachusetts",
        abbr: "MA"
      },
      {
        name: "Michigan",
        abbr: "MI"
      },
      {
        name: "Minnesota",
        abbr: "MN"
      },
      {
        name: "Mississippi",
        abbr: "MS"
      },
      {
        name: "Missouri",
        abbr: "MO"
      },
      {
        name: "Montana",
        abbr: "MT"
      },
      {
        name: "Nebraska",
        abbr: "NE"
      },
      {
        name: "Nevada",
        abbr: "NV"
      },
      {
        name: "New Hampshire",
        abbr: "NH"
      },
      {
        name: "New Jersey",
        abbr: "NJ"
      },
      {
        name: "New Mexico",
        abbr: "NM"
      },
      {
        name: "New York",
        abbr: "NY"
      },
      {
        name: "North Carolina",
        abbr: "NC"
      },
      {
        name: "North Dakota",
        abbr: "ND"
      },
      {
        name: "Ohio",
        abbr: "OH"
      },
      {
        name: "Oklahoma",
        abbr: "OK"
      },
      {
        name: "Oregon",
        abbr: "OR"
      },
      {
        name: "Pennsylvania",
        abbr: "PA"
      },
      {
        name: "Rhode Island",
        abbr: "RI"
      },
      {
        name: "South Carolina",
        abbr: "SC"
      },
      {
        name: "South Dakota",
        abbr: "SD"
      },
      {
        name: "Tennessee",
        abbr: "TN"
      },
      {
        name: "Texas",
        abbr: "TX"
      },
      {
        name: "Utah",
        abbr: "UT"
      },
      {
        name: "Vermont",
        abbr: "VT"
      },
      {
        name: "Virginia",
        abbr: "VA"
      },
      {
        name: "Washington",
        abbr: "WA"
      },
      {
        name: "West Virginia",
        abbr: "WV"
      },
      {
        name: "Wisconsin",
        abbr: "WI"
      },
      {
        name: "Wyoming",
        abbr: "WY"
      },
    ]

    const states = states_array.map((us_state) =>
      <option key={us_state.abbr} value={us_state.abbr}>{us_state.name}</option>
    )
    return ( <
      >
      <Form.Group controlId="streetAddress">
        <Form.Label>
          Street Address
        </Form.Label>
        <Form.Control
            type="text"
            placeholder="street address"
            name="street_address"
            value={street_address}
            onChange={this.handleChange}
          />
      </Form.Group> <
      Form.Row >
      <Form.Group
          as={Col}
          controlId="city"
        >
          <Form.Label>
            City
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="city"
            name="city"
            value={city}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group
          as={Col}
          controlId="state" >
        <Form.Label>
          State
        </Form.Label>
        <Form.Control
          as="select"
          name="state"
          onChange={
            this.handleChange
          }
          value={state}
        >
          {states}
        </Form.Control>
      </Form.Group>
      <
      Form.Group as = {
        Col
      }
      controlId = "zip" >
      <Form.Label>
            Zip Code
          </Form.Label> <
      Form.Control type = "text"
      placeholder = "zip"
      name = "zip"
      value = {
        zip
      }
      onChange = {
        this.handleChange
      }
      /> < /
      Form.Group > <
      /Form.Row> < / >
    )
  }
}

AddressForm.propTypes = {
  city: PropTypes.string,
  state: PropTypes.string,
  street_address: PropTypes.string,
  website: PropTypes.string,
  zip: PropTypes.string,
}
export default AddressForm
