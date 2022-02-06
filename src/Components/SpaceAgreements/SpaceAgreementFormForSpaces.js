import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
// import "react-select/dist/react-select.css";

import { getItems } from "../../api/crud.js";
import { Button } from "../Button.js";
import { Form } from "../Form.js";
import { FormButtonGroup } from "../Inputs.js";
import LoadingModal from "../LoadingModal.js";

export default function SpaceAgreementFormForSpaces({ onFormSubmit, space }) {
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTheaters, setSelectedTheaters] = useState([]);
  const [availableTheaters, setAvailableTheaters] = useState([]);

  useEffect(() => {
    if (space?.theaters) {
      let formattedTheaters = space.theaters.map((theater) => ({
        id: theater.id,
        label: String(theater.name),
      }));
      setSelectedTheaters(formattedTheaters);
    }
  }, []);

  useEffect(async () => {
    setLoading(true);
    let response = await getItems("theater");
    if (response.status >= 400) {
      console.log("error loading theaters");
    } else {
      let formattedTheaters = response.data.map((theater) => ({
        id: theater.id,
        label: String(theater.name),
      }));
      setAvailableTheaters(formattedTheaters);
    }
  }, []);

  function handleChange(selected) {
    setSelectedTheaters(selected);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let updatedSpace = {
      id: space.id,
      theater_ids: selectedTheaters.map((theater) => theater.id),
    };
    setFormOpen(false);
    onFormSubmit(updatedSpace);
  }

  function toggleFormOpen() {
    setFormOpen(!formOpen);
  }

  if (loading) {
    <LoadingModal displayText="Loading spaces" />;
  }
  if (formOpen) {
    return (
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Typeahead
          defaultSelected={selectedTheaters}
          id="theaters"
          multiple={true}
          options={availableTheaters}
          onChange={(selected) => {
            handleChange(selected);
          }}
          placeholder="Choose the theaters you work with..."
        />
        <FormButtonGroup cancelFunction={() => setFormOpen(false)} />
      </Form>
    );
  }
  return <Button onClick={toggleFormOpen}>Add or Remove Theater</Button>;
}
