import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroupInline } from "../Form";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormButtonGroup } from "../Inputs";

import { getTheaterNames } from "../../api/theaters";

import { getPlayTitles } from "../../api/plays";

import { useForm } from "../../hooks/environmentUtils";
import { useMeState } from "../../lib/meState";
import { theatersWhereUserIsAdmin } from "../../utils/authorizationUtils";
import { StartEndDatePair } from "../../utils/formUtils";

export default function NewProductionForm({ onFormSubmit, theaterId, playId }) {
  let history = useHistory();
  const { me } = useMeState();
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
      let possibleTheaters = await theatersWhereUserIsAdmin(me, response.data);
      const theaters = possibleTheaters.map((theater) => ({
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

  function handleSubmit(event) {
    event.preventDefault();
    processSubmit();
    onFormClose();
  }

  function onFormClose() {
    history.goBack();
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
    <Form
      noValidate
      onSubmit={(e) => handleSubmit(e)}
      // validated={validated}
      width="85%"
    >
      <FormGroupInline>
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
      </FormGroupInline>
      <em>
        Don't see a play you're looking for?{" "}
        <a href="mailto:henslowescloud@gmail.com">Shoot us an email.</a> We can
        only provide play text tools for public domain plays, but we can
        manually add charts and tracks for other plays. Please contact us, and
        we'll set you right up.
      </em>
      <FormGroupInline>
        <Typeahead
          id="theater"
          disabled={!!theaterId}
          options={theaters}
          onChange={setSelectedTheater}
          selected={selectedTheater}
          placeholder="Choose the theater"
          value={selectedTheater}
        />
      </FormGroupInline>
      <StartEndDatePair
        endDate={inputs.end_date}
        handleChange={handleChange}
        startDate={inputs.start_date}
      />
      <FormButtonGroup cancelFunction={onFormClose} />
    </Form>
  );
}
