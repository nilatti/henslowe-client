import { useEffect } from "react";
import { Button } from "../Button.js";
import { Form, FormGroup } from "../Form.js";
import { useForm } from "../../hooks/environmentUtils.js";

export default function NewUserModal({
  clearNewUser,
  handleClose,
  onFormSubmit,
  show,
}) {
  useEffect(() => {
    if (clearNewUser) {
      inputs.email = "";
      inputs.first_name = "";
      inputs.last_name = "";
    }
  }, [clearNewUser]);
  const { inputs, handleChange } = useForm({
    email: "",
    first_name: "",
    last_name: "",
  });

  function processSubmit(e) {
    e.preventDefault();
    onFormSubmit(
      {
        email: inputs.email,
        first_name: inputs.first_name,
        last_name: inputs.last_name,
      },
      "user"
    );
  }

  let showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="new-user-modal">
        <h3>Add New User</h3>
        <div>
          <Form noValidate onSubmit={(e) => processSubmit(e)}>
            <FormGroup controlId="first_name">
              <label>First Name</label>
              <input
                name="first_name"
                onChange={handleChange}
                placeholder="First Name"
                required
                type="text"
                value={inputs.first_name}
              />
            </FormGroup>

            <FormGroup controlId="last_name">
              <label>Last Name</label>
              <input
                name="last_name"
                onChange={handleChange}
                placeholder="Last Name"
                required
                type="text"
                value={inputs.last_name}
              />
            </FormGroup>
            <FormGroup controlId="email">
              <label>Email</label>
              <div>
                <em>
                  It is very important that you use whatever email the new
                  person would use for a google login. Stop and check with them
                  now if you are not sure.
                </em>
              </div>
              <input
                name="email"
                onChange={handleChange}
                placeholder="email"
                required
                type="email"
                value={inputs.email}
              />
            </FormGroup>
            <Button type="submit">Add User</Button>
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
          </Form>
          <hr />
        </div>
      </section>
    </div>
  );
}
