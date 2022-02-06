import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PlayWrapper from "./PlayWrapper.js";
import PlaysList from "./PlaysList.js";

import NewPlay from "./NewPlay.js";
import { createItem, deleteItem } from "../../api/crud.js";
export default function Plays() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  async function createPlay(play) {
    const response = await createItem(play, "play");
    if (response.status >= 400) {
      console.log("Error creating play");
    } else {
      navigate(`/plays/${response.data.id}`);
    }
  }

  async function deletePlay(playId) {
    const response = await deleteItem(playId, "play");
    if (response.status >= 400) {
      console.log("Error deleting play");
    } else {
      navigate("/plays");
    }
  }

  function closeNewPlayForm() {
    navigate("/plays");
  }
  function handleCreateFormSubmit(play) {
    createPlay(play);
  }

  return (
    <>
      <div>
        <div id="plays">
          <h2>
            <Link to="/plays">Plays</Link>
          </h2>
          <hr />
          <Routes>
            <Route
              path="/new"
              element={
                <NewPlay
                  onFormClose={closeNewPlayForm}
                  onFormSubmit={handleCreateFormSubmit}
                />
              }
            />

            <Route
              path={`/:playId/*`}
              element={<PlayWrapper onDeleteClick={deletePlay} />}
            />
            <Route
              path="/"
              element={<PlaysList />}
              onDeleteClick={deletePlay}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
