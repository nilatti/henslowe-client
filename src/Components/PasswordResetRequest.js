import { useState } from "react";
import { Button } from "./Button";
import { Form, FormGroupInline } from "./Form";
import { useForm } from "../hooks/environmentUtils";
import { requestPasswordReset } from "../api/users";

export default function PasswordResetRequest() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const { inputs, handleChange } = useForm({
    email: "",
  });
  async function handleSubmit(e) {
    setIsSubmitting(true);
    e.preventDefault();
    let res = await requestPasswordReset(inputs.email);
    setIsSubmitting(false);
    if (res.status > 400) {
      setErrorMessage(
        "We're sorry. There was a problem. Please contact us for help."
      );
    } else {
      setSuccessfulSubmit(true);
    }
  }
  if (successfulSubmit) return <div>Success! Go check your email!</div>;
  return (
    <div>
      <h1>Request a password reset</h1>
      <Form noValidate onSubmit={handleSubmit} width="100%;">
        <FormGroupInline controlId="email">
          <label>Email</label>
          <input
            name="email"
            onChange={handleChange}
            placeholder="email"
            required
            type="email"
            autoComplete="email"
            value={inputs.email}
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
