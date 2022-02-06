import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { createItem, deleteItem, updateServerItem } from "../../api/crud.js";

import { getSpaceNames } from "../../api/spaces.js";
import SpacesList from "./SpacesList.js";
import SpaceWrapper from "./SpaceWrapper.js";
import NewSpace from "./NewSpace.js";
import ErrorMessages from "../ErrorMessages.js";

export default function Spaces() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(async () => {
    const response = await getSpaceNames();
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching spaces"]);
    } else {
      setSpaces(response.data);
    }
  }, []);

  async function handleCreateFormSubmit(newSpace) {
    const response = await createItem(newSpace, "space");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching spaces"]);
    } else {
      let newSpaces = (spaces) => [...spaces, newSpace];
      setSpaces(newSpaces);
      navigate(`/spaces/${response.data.id}`);
    }
  }

  async function handleDeleteClick(spaceId) {
    const response = await deleteItem(spaceId, "space");
    if (response.status >= 404) {
      setErrors((errors) => [...errors, "Error fetching spaces"]);
    } else {
      let newSpaces = spaces.filter((space) => space.id != spaceId);
      setSpaces(newSpaces);
      navigate("/spaces");
    }
  }

  async function handleEditFormSubmit(newSpace) {
    const response = await updateServerItem(newSpace, "space");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error updating space"]);
    } else {
      let newSpaces = spaces.map((space) => {
        if (space.id != newSpace.id) {
          return space;
        } else {
          return response.data;
        }
      });
      setSpaces(newSpaces);
      navigate(`/spaces/${response.data.id}`);
    }
  }

  return (
    <div id="spaces">
      <h2>
        <Link to="/spaces">Spaces</Link>
      </h2>
      <ErrorMessages errors={errors} />
      <hr />
      <Routes>
        <Route
          path="/spaces/new"
          children={(props) => (
            <NewSpace {...props} onFormSubmit={handleCreateFormSubmit} />
          )}
        />
        <Route
          path={`/spaces/:spaceId`}
          children={(props) => (
            <SpaceWrapper
              {...props}
              onDeleteClick={handleDeleteClick}
              onFormSubmit={handleEditFormSubmit}
            />
          )}
        />
        <Route
          path={"/spaces/"}
          children={(props) => <SpacesList {...props} spaces={spaces} />}
        />
      </Routes>
    </div>
  );
}
