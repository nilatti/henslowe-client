import { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { createItem, deleteItem, updateServerItem } from "../../api/crud";

import { getSpaceNames } from "../../api/spaces";
import SpacesList from "./SpacesList";
import EditableSpace from "./EditableSpace";
import NewSpace from "./NewSpace";
import ErrorMessages from "../ErrorMessages";

export default function Spaces() {
  const history = useHistory();
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
      history.push(`/spaces/${response.data.id}`);
    }
  }

  async function handleDeleteClick(spaceId) {
    const response = await deleteItem(spaceId, "space");
    if (response.status >= 404) {
      setErrors((errors) => [...errors, "Error fetching spaces"]);
    } else {
      let newSpaces = spaces.filter((space) => space.id != spaceId);
      setSpaces(newSpaces);
      history.push("/spaces");
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
      history.push(`/spaces/${response.data.id}`);
      history.go();
    }
  }

  return (
    <div id="spaces">
      <h2>
        <Link to="/spaces">Spaces</Link>
      </h2>
      <ErrorMessages errors={errors} />
      <hr />
      <Switch>
        <Route
          path="/spaces/new"
          render={(props) => (
            <NewSpace {...props} onFormSubmit={handleCreateFormSubmit} />
          )}
        />
        <Route
          path={`/spaces/:spaceId`}
          render={(props) => (
            <EditableSpace
              {...props}
              onDeleteClick={handleDeleteClick}
              onFormSubmit={handleEditFormSubmit}
            />
          )}
        />
        <Route
          path={"/spaces/"}
          render={(props) => <SpacesList {...props} spaces={spaces} />}
        />
      </Switch>
    </div>
  );
}
