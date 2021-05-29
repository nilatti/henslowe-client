import { useState } from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./Button";
import { Form, FormGroupInline } from "./Form";
import { useForm } from "../hooks/environmentUtils";

const SignInStyle = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  max-width: 500px;
  padding-bottom: 25px;
  width: 100%;
`;

export default function SignIn() {
  let history = useHistory();
  const { inputs, handleChange } = useForm({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let user = { email: inputs.email, password: inputs.password };
    AuthService.login(user).then(
      () => {
        history.push("/dashboard");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          error.response.status === 401
            ? "Wrong username or password."
            : (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
        setIsSubmitting(false);
        setErrorMessage(resMessage);
      }
    );
  };

  return (
    <SignInStyle>
      <h1>Sign in</h1>
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
        <FormGroupInline controlId="password">
          <label>Password</label>
          <input
            name="password"
            onChange={handleChange}
            placeholder="password"
            type="password"
            autoComplete="current-password"
            value={inputs.password}
          />
        </FormGroupInline>
        <Button type="submit" variant="primary" maxWidth="100%" margin="0">
          {isSubmitting ? "Loading..." : "Login"}
        </Button>
        {errorMessage && <p className="form-error">{errorMessage}</p>}
      </Form>
      <a href="/password_reset_request">Forgot your password?</a>
      <a href="/users/new">Sign Up</a>
    </SignInStyle>
  );
}
