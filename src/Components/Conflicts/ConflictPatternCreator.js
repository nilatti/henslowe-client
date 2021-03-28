import React from "react";
import { Col } from "react-bootstrap";

import { USER_CONFLICT_REASONS } from "../../utils/hardcodedConstants";

import ConflictPatternCreatorForm from "./ConflictPatternCreatorForm";

export default function ConflictPatternCreator({
  submitHandler,
  userId,
  cancel,
}) {
  return (
    <Col
      md={{
        span: 8,
        offset: 2,
      }}
    >
      <p>
        Conflict patterns are just patterns that feed into our conflict
        generator. If you have multiple conflict patterns, you will need to run
        this generator a few times.
      </p>
      <p>
        For example: During normal weeks, you work Sundays from 5:30-9:30, and
        Tuesdays and Thursdays 6:30-8:30.
      </p>
      <p>
        You would need to make the following different conflict patterns (doing
        this form twice):
      </p>
      <ul>
        <li>Sundays, 5:30-9:30</li>
        <li>Tuesdays and Thursdays, 6:30-8:30</li>
      </ul>
      <ConflictPatternCreatorForm
        cancel={cancel}
        conflictReasonsArray={USER_CONFLICT_REASONS}
        submitHandler={submitHandler}
      />
      <hr />
    </Col>
  );
}
