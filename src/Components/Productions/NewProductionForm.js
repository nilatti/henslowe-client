import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Datetime from "react-datetime"; //updated!

import { getTheaterNames } from "../../api/theaters";

import { getPlayTitles } from "../../api/plays";

import { isAfterDate, useForm } from "../../hooks/environmentUtils";

export default function NewProductionForm({
  onFormClose,
  onFormSubmit,
  theaterId,
  playId,
}) {
  const [errorStatus, setErrorStatus] = useState("");
  const [plays, setPlays] = useState([]);
  const [selectedPlay, setSelectedPlay] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState([]);
  const [theaters, setTheaters] = useState([]);

  //get theaters for typeahead
  useEffect(async () => {
    const response = await getTheaterNames();
    if (response.status >= 400) {
      setErrorStatus("Error fetching theaters");
    } else {
      const theaters = response.data.map((theater) => ({
        id: theater.id,
        label: String(theater.name),
      }));
      if (theaterId) {
        let theater = theaters.find((theater) => theater.id == theaterId);
        setSelectedTheater([theater]);
      }
      setTheaters(theaters);
    }
  }, []);

  //get plays for typeahead
  useEffect(async () => {
    const response = await getPlayTitles();
    if (response.status >= 400) {
      setErrorStatus("Error fetching plays");
    } else {
      const plays = response.data.map((play) => ({
        id: play.id,
        label: String(play.title),
      }));
      if (playId) {
        let play = plays.find((play) => play.id == playId);
        setSelectedPlay([play]);
      }
      setPlays(plays);
    }
  }, []);

  const { inputs, handleChange } = useForm({
    end_date: new Date(),
    start_date: new Date(),
  });

  function handleDateTimeChange(time, name) {
    let e = {
      target: {
        value: time,
        name: name,
        type: "datetime",
      },
    };
    handleChange(e);
  }

  function handleSubmit(event) {
    console.log("handler called");
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      processSubmit();
      onFormClose();
    }
  }

  function processSubmit() {
    onFormSubmit(
      {
        end_date: inputs.end_date,
        play_id: selectedPlay[0].id,
        start_date: inputs.start_date,
        theater_id: selectedTheater[0].id,
      },
      "production"
    );
  }
  if (!plays.length) {
    return <div>Loading plays</div>;
  }
  if (!theaters.length) {
    return <div>Loading theaters</div>;
  }
  return (
    <Col md={{ span: 8, offset: 2 }}>
      <Form
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        // validated={validated}
      >
        <Form.Group>
          <Typeahead
            value={selectedPlay}
            id="play"
            type="typeahead"
            options={plays}
            onChange={setSelectedPlay}
            placeholder="Choose the play"
            selected={selectedPlay}
            disabled={!!playId}
          />
          <Form.Control.Feedback type="invalid">
            Play is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Typeahead
            id="theater"
            disabled={!!theaterId}
            options={theaters}
            onChange={setSelectedTheater}
            selected={selectedTheater}
            placeholder="Choose the theater"
            value={selectedTheater}
          />
          <Form.Control.Feedback type="invalid">
            Theater is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="start_date">
          <Form.Label>From</Form.Label>
          <Datetime
            timeFormat={false}
            format={"MM/DD/YYYY"}
            onChange={(date) => handleDateTimeChange(date, "start_date")}
            required
            value={inputs.start_date}
          />
        </Form.Group>
        <Form.Group controlId="end_date">
          <Form.Label>To</Form.Label>
          <Datetime
            isValidDate={(current) => isAfterDate(inputs.start_date, current)}
            timeFormat={false}
            format={"MM/DD/YYYY"}
            onChange={(date) => handleDateTimeChange(date, "end_date")}
            required
            value={inputs.end_date}
          />
        </Form.Group>
        <Button type="submit" variant="primary" block>
          Submit
        </Button>
        <Button type="button" onClick={onFormClose} block>
          Cancel
        </Button>
      </Form>
      <hr />
    </Col>
  );
}

NewProductionForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  playId: PropTypes.number,
  production: PropTypes.object,
  theaterId: PropTypes.number,
};
