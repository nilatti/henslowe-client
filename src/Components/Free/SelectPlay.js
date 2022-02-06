import { useEffect, useState } from "react";

import { Typeahead } from "react-bootstrap-typeahead";
import { Form, FormGroup } from "../Form.js";
import Modal from "../Modal.js";
import { Spinner } from "../Loaders.js";
import fetchData from "../../hooks/fetchData.js";
import { SHAKESPEARE_ID } from "../../utils/hardcodedConstants.js";
import { getPlayTitles } from "../../api/plays.js";
import { usePlayState } from "../../lib/freePlayState.js";

export default function SelectPlay() {
  const { getPlay, loading, setLoading } = usePlayState();
  // const { errorDisplay, error, setError } = ErrorApi();
  const [plays, setPlays] = useState([]);
  const [selectedPlay, setSelectedPlay] = useState([]); // Typeahead returns an array even if it is set to return only one item
  useEffect(async () => {
    let response = await fetchData(getPlayTitles, setLoading);
    if (response) {
      let shakespeare = response.filter(
        (play) => play.author_id == SHAKESPEARE_ID
      );
      const plays = shakespeare.map((play) => ({
        id: play.id,
        label: String(play.title),
      }));
      setPlays(plays);
    }
  }, []);

  useEffect(() => {
    getPlay(selectedPlay[0]?.id);
  }, [selectedPlay]);

  if (loading) {
    return (
      <Modal>
        <h1>Loading play</h1>
        <div>
          This takes a little while, but it only has to happen once until you
          switch plays or close your browser
        </div>
        <Spinner />
      </Modal>
    );
  }
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)}>
      <FormGroup>
        <Typeahead
          value={selectedPlay}
          id="play"
          type="typeahead"
          options={plays}
          onChange={setSelectedPlay}
          placeholder="Choose the play"
          selected={selectedPlay}
        />
      </FormGroup>
    </Form>
  );
}
