import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../../api/crud";

import UserForm from "./UserForm";
import UserShow from "./UserShow";
import Modal from "../Modal";
import { Spinner } from "../Loaders";

// import { getOverlap } from "../../utils/authorizationUtils";
import { UserAuthProvider } from "../Contexts";

export default function EditableUser({ onDeleteClick, onFormSubmit }) {
  const [formOpen, setFormOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  let { userId } = useParams();
  useEffect(async () => {
    setLoading(true);
    let response = await getItem(userId, "user");
    if (response.status >= 400) {
      console.log("error!");
      setErrors((errors) => [...errors, "Error fetching user"]);
    } else {
      setUser(response.data);
      setLoading(false);
    }
  }, []);

  function handleEditClick() {
    setFormOpen(true);
  }
  function handleFormClose() {
    setFormOpen(false);
  }
  function handleSubmit(user) {
    onFormSubmit(user);
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
      <UserForm
        user={user}
        onFormSubmit={handleSubmit}
        onFormClose={handleFormClose}
        isOpen={true}
      />
    );
  }

  return (
    <UserAuthProvider user={user}>
      <UserShow
        user={user}
        onEditClick={handleEditClick}
        onDeleteClick={onDeleteClick}
        onFormSubmit={handleSubmit}
      />
    </UserAuthProvider>
  );
}
