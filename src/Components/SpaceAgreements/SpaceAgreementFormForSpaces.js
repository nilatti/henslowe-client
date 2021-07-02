import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-select/dist/react-select.css";

import { Button } from "../Button";
import { Form } from "../Form";
import Modal from "../Modal";
import { Spinner } from "../Loaders";
import { getItems } from "../../api/crud";

export default function SpaceAgreementFormForSpaces({
  onFormClose,
  onFormSubmit,
  space,
}) {
  const [availableTheaters, setAvailableTheaters] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTheaters, setSelectedTheaters] = useState(space.theaters);

  useEffect(async () => {
    setLoading(true);
    let response = await getItems("theater");
    if (response.status >= 400) {
      console.log("error!");
      setErrors((errors) => [...errors, "Error fetching theaters"]);
    } else {
      setAvailableTheaters(response.data);
    }
    setLoading(false);
  }, []);

  function handleChange(selected) {
    setSelectedTheaters(selected);
  }

  function handleSubmit(event) {
    event.preventDefault();
    processSubmit();
  }

  function processSubmit() {
    onFormSubmit({
      id: space.id,
      theater_ids: selectedTheaters.map((theater) => theater.id),
    });
  }
  if (loading) {
    return (
      <Modal>
        <h1>Loading theaters!</h1>
        <Spinner />
      </Modal>
    );
  }
  var availableTheatersAutocomplete = availableTheaters.map((theater) => ({
    id: theater.id,
    label: String(theater.name),
  }));

  var selectedTheatersAutocomplete = selectedTheaters.map((theater) => ({
    id: theater.id,
    label: String(theater.name),
  }));
  return (
    <Form onSubmit={(e) => handleSubmit(e)} width="85%">
      <Typeahead
        defaultSelected={selectedTheatersAutocomplete}
        id="theaters"
        multiple={true}
        options={availableTheatersAutocomplete}
        onChange={(selected) => {
          handleChange(selected);
        }}
        placeholder="Choose the theaters you work with..."
      />
      <Button type="submit">Submit</Button>
      <Button type="button" onClick={onFormClose}>
        Cancel
      </Button>
    </Form>
  );
}

//     return (
//       <Col md={{ span: 8, offset: 2 }}>
//
//         <hr />
//       </Col>
//     );
//   }
// }

// SpaceAgreementFormForSpaces.propTypes = {
//   onFormClose: PropTypes.func.isRequired,
//   onFormSubmit: PropTypes.func.isRequired,
//   space: PropTypes.object.isRequired,
// };

// export default SpaceAgreementFormForSpaces;
