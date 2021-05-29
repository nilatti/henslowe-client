import { useState } from "react";
import { Button } from "./Button";
import { Form, FormGroupInline } from "./Form";
import { useForm } from "../hooks/environmentUtils";
import { resetPassword } from "../api/users";
import { useQuery } from "../hooks/environmentUtils";

export default function PasswordResetRequest() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const { inputs, handleChange } = useForm({
    password: "",
    confirmPassword: "",
  });
  let query = useQuery();
  let token = query.get("reset_password_token");
  async function handleSubmit(e) {
    setIsSubmitting(true);
    e.preventDefault();
    let res = await resetPassword(
      token,
      inputs.password,
      inputs.confirmPassword
    );
    setIsSubmitting(false);
    if (res.status > 400) {
      setErrorMessage(
        "We're sorry. There was a problem. Please contact us for help."
      );
    } else {
      setSuccessfulSubmit(true);
    }
  }
  if (successfulSubmit) return <div>Success! Welcome back!</div>;
  return (
    <div>
      <h1>Enter a new password</h1>
      <Form noValidate onSubmit={handleSubmit} width="100%;">
        <FormGroupInline controlId="password">
          <label>New Password</label>
          <input
            name="password"
            onChange={handleChange}
            placeholder="new password"
            required
            type="password"
            autoComplete="new-password"
            value={inputs.password}
          />
        </FormGroupInline>
        <FormGroupInline controlId="password">
          <label>Confirm password</label>
          <input
            name="confirmPassword"
            onChange={handleChange}
            placeholder="confirm password"
            required
            type="password"
            autoComplete="new-password"
            value={inputs.confirmPassword}
          />
        </FormGroupInline>
        <Button type="submit" variant="primary" maxWidth="100%" margin="0">
          {isSubmitting ? "Loading..." : "Login"}
        </Button>
        {errorMessage && <p className="form-error">{errorMessage}</p>}
      </Form>
      <a href="/users/new">Sign Up</a>
    </div>
  );
}
