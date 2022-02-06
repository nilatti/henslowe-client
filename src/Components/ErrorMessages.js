import styled from "styled-components";
import uuid from "react-uuid";
import { useNavigate } from "react-router";
import { useErrorState } from "../lib/errorState.js";
import { useEffect, useState } from "react";
import { useMeState } from "../lib/meState.js";
import { useQuery } from "../hooks/environmentUtils.js";

import { useSearchParams } from "react-router-dom";

const ErrorStyles = styled.div`
  background-color: #cd5c5c;
  color: #800000;
  margin-bottom: 15px;
  padding: 15px;

  ul {
    margin: 0;
  }
`;

export default function ErrorMessages() {
  const { errors, updateErrors } = useErrorState();
  const [formattedErrors, setFormattedErrors] = useState(null);
  const { clearMe } = useMeState();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // const { signOut } = useGoogleSignOut();
  let urlError = searchParams.get("error");
  // console.log(urlError);
  // // if (urlError) {
  //   if (urlError == "401") updateErrors({ response: { status: 401 } });
  // }
  useEffect(() => {
    if (errors) {
      let errorObjs = [
        ...new Set(
          errors.map((error) => {
            if (error.response?.status) {
              if (error.response.status === 403) {
                error.message = "You are not authorized to view this resource.";
              } else if (error.response.status === 401) {
                error.message =
                  "Your login has expired; please log out and back in.";
              }
              return error;
            }
          })
        ),
      ];

      setFormattedErrors(
        errorObjs.map((error) => <li key={uuid()}>{error?.message}</li>)
      );
    }
  }, [JSON.stringify(errors)]);

  // useEffect(() => {
  //   if (errors) {
  //     errors.forEach((error) => {
  //       if (error.response?.status) {
  //         if (error.response.status == 401) {
  //           console.log("401");
  //           // signOut;
  //         }
  //       }
  //     });
  //   }
  // }, [JSON.stringify(errors)]);
  if (errors.length) {
    return (
      <ErrorStyles>
        <h2>Errors</h2>
        <ul>{formattedErrors}</ul>
      </ErrorStyles>
    );
  }
  return <></>;
}
