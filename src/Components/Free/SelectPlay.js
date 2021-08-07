import { useEffect, useState } from "react";

import { Typeahead } from "react-bootstrap-typeahead";
import { Form, FormGroup } from "../Form.js";
import Modal from "../Modal";
import { Spinner } from "../Loaders";
import { SHAKESPEARE_ID } from "../../utils/hardcodedConstants.js";
import { getPlayTitles } from "../../api/plays";
import { usePlayState } from "../../lib/freePlayState";

export default function SelectPlay() {
  const { getPlay, loading } = usePlayState();
  const [plays, setPlays] = useState([]);
  const [selectedPlay, setSelectedPlay] = useState([]); // Typeahead returns an array even if it is set to return only one item
  useEffect(async () => {
    const response = await getPlayTitles();
    if (response.status >= 400) {
      setErrorStatus("Error fetching plays");
    } else {
      console.log(response.data);
      let shakespeare = response.data.filter(
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
        <h1>Loading play!</h1>
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
