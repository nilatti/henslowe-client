import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  width: ${(props) => props.width || "35%"};
  margin: 0 auto;
  label {
    flex-basis: 25%;
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
  justify-content: space-around;
  @media screen and (min-width: 480px) {
    flex-flow: row wrap;
  }
  label {
    @media screen and (min-width: 480px) {
      padding-right: 25px;

      text-align: right;
    }
  }
`;
