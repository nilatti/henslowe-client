import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-select/dist/react-select.css";

import { getItems } from "../../api/crud";
import { Button } from "../Button";
import { Form } from "../Form";
import { FormButtonGroup } from "../Inputs";
import LoadingModal from "../LoadingModal";

export default function SpaceAgreementFormForTheaters({
  onFormSubmit,
  theater,
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [availableSpaces, setAvailableSpaces] = useState([]);

  useEffect(() => {
    if (theater?.spaces) {
      let formattedSpaces = theater.spaces.map((space) => ({
        id: space.id,
        label: String(space.name),
      }));
      setSelectedSpaces(formattedSpaces);
    }
  }, []);

  useEffect(async () => {
    setLoading(true);
    let response = await getItems("space");
    if (response.status >= 400) {
      console.log("error loading spaces");
    } else {
      let formattedSpaces = response.data.map((space) => ({
        id: space.id,
        label: String(space.name),
      }));
      setAvailableSpaces(formattedSpaces);
    }
  }, []);

  function handleChange(selected) {
    setSelectedSpaces(selected);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let updatedTheater = {
      id: theater.id,
      space_ids: selectedSpaces.map((space) => space.id),
    };
    setFormOpen(false);
    onFormSubmit(updatedTheater);
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
          defaultSelected={selectedSpaces}
          id="spaces"
          multiple={true}
          options={availableSpaces}
          onChange={(selected) => {
            handleChange(selected);
          }}
          placeholder="Choose the spaces you work with..."
        />
        <FormButtonGroup cancelFunction={() => setFormOpen(false)} />
      </Form>
    );
  }
  return <Button onClick={toggleFormOpen}>Add or Remove Space</Button>;
}
