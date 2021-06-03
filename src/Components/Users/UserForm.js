import AddressForm from "../AddressForm";
import PropTypes from "prop-types";
import Button from "../Button";
import { Form } from "../Form";
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

  return <Form noValidate onSubmit={(e) => this.handleSubmit(e)}></Form>;
}

// handleTimezoneChange = (timezone) => {
//   this.setState({
//     timezone: timezone
//   })
// }

//

//     <Form.Group controlId="first_name">
//       <Form.Label>
//         First Name
//       </Form.Label>
//       <Form.Control
//           name="first_name"
//           onChange={this.handleChange}
//           placeholder="First Name"
//           required
//           type="text"
//           value={this.state.first_name}
//         />
//         <Form.Control.Feedback type="invalid">
//           First Name is required
//         </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group controlId="middle_name">
//       <Form.Label>
//         Middle Name
//       </Form.Label>
//       <Form.Control
//           name="middle_name"
//           onChange={this.handleChange}
//           placeholder="Middle Name"
//           type="text"
//           value={this.state.middle_name}
//         />
//     </Form.Group>
//     <Form.Group controlId="preferred_name">
//       <Form.Label>
//         Preferred Name
//       </Form.Label>
//       <Form.Control
//           name="preferred_name"
//           onChange={this.handleChange}
//           placeholder="Preferred Name"
//           type="text"
//           value={this.state.preferred_name}
//         />
//     </Form.Group>
//     <Form.Group controlId="last_name">
//       <Form.Label>
//         Last Name
//       </Form.Label>
//       <Form.Control
//           name="last_name"
//           onChange={this.handleChange}
//           placeholder="Last Name"
//           required
//           type="text"
//           value={this.state.last_name}
//         />
//         <Form.Control.Feedback type="invalid">
//           Last Name is required
//         </Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group controlId="program_name">
//           <Form.Label>
//             How do you want to be listed in a program?
//           </Form.Label>
//           <Form.Control
//               name="program_name"
//               onChange={this.handleChange}
//               placeholder="Program Name"
//               required
//               type="text"
//               value={this.state.program_name}
//             />
//             <Form.Control.Feedback type="invalid">
//               This field is required
//             </Form.Control.Feedback>
//     </Form.Group>
//         <Form.Group controlId="email">
//           <Form.Label>
//             Email
//           </Form.Label>
//           <Form.Control
//               name="email"
//               onChange={this.handleChange}
//               placeholder="email"
//               required
//               type="email"
//               value={this.state.email}
//             />
//             <Form.Control.Feedback type="invalid">
//               Email is required
//             </Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group controlId="password">
//           <Form.Label>
//             Password
//           </Form.Label>
//             <Form.Control
//               name="password"
//               onChange={this.handleChange}
//               placeholder="password"
//               type="password"
//               value={this.state.password}
//             />
//         </Form.Group>
//         <Form.Group controlId="password_confirmation">
//           <Form.Label>
//             Confirm Password
//           </Form.Label>
//             <Form.Control
//               name="password_confirmation"
//               onChange={this.handleChange}
//               placeholder="confirm password"
//               type="password"
//               value={this.state.password_confirmation}
//             />
//             <Form.Control.Feedback type="invalid">
//               Passwords must match and are required
//             </Form.Control.Feedback>
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
