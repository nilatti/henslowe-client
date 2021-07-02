import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../../api/crud";

import TheaterForm from "./TheaterForm";
import TheaterShow from "./TheaterShow";
import ErrorMessages from "../ErrorMessages";

import { TheaterAuthProvider } from "../Contexts";
import Modal from "../Modal";
import { Spinner } from "../Loaders";

export default function EditableTheater({ onDeleteClick, onFormSubmit }) {
  const [errors, setErrors] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [theater, setTheater] = useState({});
  const [loading, setLoading] = useState(false);
  let { theaterId } = useParams();
  useEffect(async () => {
    setLoading(true);
    let response = await getItem(theaterId, "theater");
    if (response.status >= 400) {
      console.log("error!");
      setErrors((errors) => [...errors, "Error fetching theater"]);
    } else {
      setTheater(response.data);
    }
    setLoading(false);
  }, []);
  function handleEditClick() {
    setFormOpen(true);
  }
  function handleFormClose() {
    setFormOpen(false);
  }
  function handleSubmit(theater) {
    onFormSubmit(theater);
  }

  if (loading) {
    return (
      <Modal>
        <h1>Loading!</h1>
        <Spinner />
      </Modal>
    );
  }

  if (formOpen) {
    return (
      <TheaterForm
        theater={theater}
        onFormSubmit={handleSubmit}
        onFormClose={handleFormClose}
        isOpen={true}
      />
    );
  }

  return (
    <TheaterAuthProvider theaterId={theater.id}>
      <TheaterShow
        theater={theater}
        onEditClick={handleEditClick}
        onDeleteClick={onDeleteClick}
        onFormSubmit={handleSubmit}
      />
    </TheaterAuthProvider>
  );
}
