import styled from "styled-components";

export const Form = styled.form`
  background-color: ${(props) =>
    props.backgroundColor || "var(--color-background)"};
  display: flex;
  flex-flow: column nowrap;
  padding: 25px;
  margin: ${(props) => props.margin || "0 auto"};
  width: ${(props) => props.mobileWidth || "85%"};
  @media screen and (min-width: 600px) {
    width: ${(props) => props.width || "35%"};
  }
  fieldset {
    display: flex;
    padding: 7px 0;
  }
  label {
    flex-basis: 25%;
    text-align: center;
  }
  input {
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    flex: 1 0 0;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:disabled {
      background-color: #c8c8c8;
      font-style: italic;
    }
  }
  input[type="number"] {
    flex: 0 1 50px;
  }
  select {
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    flex: 1 0 0;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  textarea {
    flex-grow: 1;
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    color: #495057;
    display: block;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin: 0px;
    padding: 0.375rem 0.75rem;
    resize: none;

    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  button {
    margin: 7px auto;
    min-width: 150px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 10px 0;
  width: 100%;
`;

export const FormGroupInline = styled.div`
  display: flex;
  flex-flow: column nowrap;

  margin: 10px 0;
  width: 100%;
  justify-content: ${(props) => props.justifyContent || "space-between"};
  @media screen and (min-width: 480px) {
    flex-flow: row wrap;
  }
  input {
    flex-basis: 50%;
  }
  input[type="number"] {
    flex-basis: 10%;
  }
  label {
    flex-basis: 80%;
    @media screen and (min-width: 480px) {
      flex-basis: 50%;
      padding-right: 25px;
      text-align: right;
    }
  }
`;
