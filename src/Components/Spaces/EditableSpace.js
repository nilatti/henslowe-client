import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../../api/crud";

import SpaceForm from "./SpaceForm";
import SpaceShow from "./SpaceShow";
import ErrorMessages from "../ErrorMessages";

import { SpaceAuthProvider } from "../Contexts";
import Modal from "../Modal";
import { Spinner } from "../Loaders";

export default function EditableSpace({ onDeleteClick, onFormSubmit }) {
  const [errors, setErrors] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [space, setSpace] = useState({});
  const [loading, setLoading] = useState(false);
  //user role? generate here or pull in from auth context provider?
  let { spaceId } = useParams();
  useEffect(async () => {
    setLoading(true);
    let response = await getItem(spaceId, "space");
    if (response.status >= 400) {
      console.log("error!");
      setErrors((errors) => [...errors, "Error fetching space"]);
    } else {
      setSpace(response.data);
    }
    setLoading(false);
  }, []);
  function handleEditClick() {
    setFormOpen(true);
  }
  function handleFormClose() {
    setFormOpen(false);
  }
  function handleSubmit(space) {
    onFormSubmit(space);
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
      <SpaceForm
        space={space}
        onFormSubmit={handleSubmit}
        onFormClose={handleFormClose}
        isOpen={true}
      />
    );
  }

  return (
    <SpaceAuthProvider space={space}>
      <SpaceShow
        space={space}
        onEditClick={handleEditClick}
        onDeleteClick={onDeleteClick}
        onFormSubmit={handleSubmit}
      />
    </SpaceAuthProvider>
  );
}
