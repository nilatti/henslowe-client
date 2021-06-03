import AddressForm from "../AddressForm";
import PropTypes from "prop-types";
import Button from "../Button";
import { Form, FormGroupInline } from "../Form";
// import { Button, Col, Form } from "react-bootstrap";
import { useForm } from "../../hooks/environmentUtils";
import TimezonePicker from "react-timezone";
///do next: rebuild user form. If register user == true, login the user by saving to localStorage and redirect to dashboard. Otherwise don't do that.
export default function UserForm({ onFormSubmit, user }) {
  const { inputs, handleChange } = useForm(
    user || {
      bio: "",
      birthdate: "",
      city: "",
      description: "",
      email: "",
      emergency_contact_name: "",
      emergency_contact_number: "",
      first_name: "",
      gender: "",
      last_name: "",
      middle_name: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      preferred_name: "",
      program_name: "",
      state: "",
      timezone: "",
      website: "",
      zip: "",
    }
  );
  function handleSubmit(event) {
    event.preventDefault();
    processSubmit();
  }

  function processSubmit() {
    onFormSubmit(inputs, "user");
  }

  return (
    <Form noValidate onSubmit={(e) => this.handleSubmit(e)} width="75%">
      <FormGroupInline>
        <label>First Name</label>
        <input
          name="first_name"
          onChange={handleChange}
          placeholder="First Name"
          required
          type="text"
          value={inputs.first_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Middle Name</label>
        <input
          name="middle_name"
          onChange={handleChange}
          placeholder="Middle Name"
          type="text"
          value={inputs.middle_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Preferred Name</label>
        <input
          name="preferred_name"
          onChange={handleChange}
          placeholder="Preferred Name"
          type="text"
          value={inputs.preferred_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Last Name</label>
        <input
          name="last_name"
          onChange={handleChange}
          placeholder="Last Name"
          required
          type="text"
          value={inputs.last_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>How do you want to be listed in a program?</label>
        <input
          name="program_name"
          onChange={handleChange}
          placeholder="Program Name"
          required
          type="text"
          value={inputs.program_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Email</label>
        <input
          name="email"
          onChange={handleChange}
          placeholder="email"
          required
          type="email"
          value={inputs.email}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Password</label>
        <input
          name="password"
          onChange={handleChange}
          placeholder="password"
          type="password"
          value={inputs.password}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Confirm Password</label>
        <input
          name="password_confirmation"
          onChange={handleChange}
          placeholder="confirm password"
          type="password"
          value={inputs.password_confirmation}
        />
      </FormGroupInline>
    </Form>
  );
}

// handleTimezoneChange = (timezone) => {
//   this.setState({
//     timezone: timezone
//   })
// }

//

//

//         </Form.Group>

//         <Form.Group controlId="website">
//           <Form.Label>
//             Website
//           </Form.Label>
//           <Form.Control
//               name="website"
//               onChange={this.handleChange}
//               placeholder="http://"
//               type="url"
//               value={this.state.website}
//             />
//         </Form.Group>
//         <Form.Group controlId="phone_number">
//           <Form.Label>
//             Phone Number
//           </Form.Label>
//           <Form.Control
//               name="phone_number"
//               onChange={this.handleChange}
//               placeholder="phone number"
//               required
//               type="tel"
//               value={this.state.phone_number}
//             />
//             <Form.Control.Feedback type="invalid">
//               Phone number is required
//             </Form.Control.Feedback>
//         </Form.Group>
//         <AddressForm
//           city={this.state.city}
//           onChange={this.handleChange}
//           state={this.state.state}
//           street_address={this.state.street_address}
//           zip={this.state.zip}
//         />
//         <Form.Group controlId="timezone">
//         <Form.Label>
//           Timezone
//         </Form.Label>
//         <TimezonePicker
//         inputProps={{
//           placeholder: 'Select Timezone...',
//           name: 'timezone',
//           } }
//             value = {this.state.timezone}
//             placeholder = "Select timezone..."
//             onChange = {this.handleTimezoneChange}
//             required
//             />
//         </Form.Group>
//         <Form.Group controlId="birthdate">
//           <Form.Label>
//             Date of Birth
//           </Form.Label>
//           <Form.Control
//               name="birthdate"
//               onChange={this.handleChange}
//               placeholder=""
//               type="date"
//               value={this.state.birthdate}
//             />
//         </Form.Group>
//         <Form.Group
//           controlId="gender" >
//         <Form.Label>
//           Gender
//         </Form.Label>
//         <Form.Control
//           as="select"
//           name="gender"
//           onChange={
//             this.handleChange
//           }
//           value={this.state.gender}
//         >
//           <option></option>
//           <option key='female' value='Female'>Female</option>
//           <option key='nonbinary' value='Nonbinary/Third Gender'>Nonbinary/Third Gender</option>
//           <option key='male' value='Male'>Male</option>
//           <option key='other' value='Other/Prefer Not to Say'>Other/Prefer Not to Say</option>
//         </Form.Control>
//       </Form.Group>
//       <Form.Group controlId="description">
//         <Form.Label>
//           Describe yourself
//         </Form.Label>
//         <Form.Control
//           as="textarea"
//           name="description"
//           onChange={this.handleChange}
//           placeholder=""
//           rows="10"
//           value={this.state.description}
//         />
//       </Form.Group>
//       <Form.Group controlId="bio">
//         <Form.Label>
//           Bio
//         </Form.Label>
//         <Form.Control
//           as="textarea"
//           name="bio"
//           onChange={this.handleChange}
//           placeholder=""
//           rows="10"
//           value={this.state.bio}/>
//           </Form.Group>
//         <Form.Group controlId="emergency_contact_name">
//           <Form.Label>
//             Emergency Contact Name
//           </Form.Label>
//           <Form.Control
//               name="emergency_contact_name"
//               onChange={this.handleChange}
//               placeholder=""
//               type="text"
//               value={this.state.emergency_contact_name}
//             />
//             </Form.Group>
//             <Form.Group controlId="emergency_contact_number">
//               <Form.Label>
//                 Emergency Contact Number
//               </Form.Label>
//               <Form.Control
//                   name="emergency_contact_number"
//                   onChange={this.handleChange}
//                   placeholder=""
//                   type="tel"
//                   value={this.state.emergency_contact_number}
//                 />
//                 </Form.Group>

//           <Button type="submit" variant="primary" block>Submit</Button>
//           <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
//       </Form>
//       <hr />
//     </Col>
//   )
// }
// }

UserForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
