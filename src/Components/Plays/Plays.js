import { useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import CharactersBreakdown from "./Characters/CharactersBreakdown";
import PlayWrapper from "./PlayWrapper";
import PlaysList from "./PlaysList";

import NewPlay from "./NewPlay";
import PartScriptsContainerPaid from "./PlayScripts/PartScripts/PartScriptsContainerPaid";
import PlayShow from "./PlayShow";
import PlayScript from "./PlayScripts/PlayScript";
import TextUnitBreakdown from "./TextUnitBreakdown";
import WordCloudContainerPaid from "./PlayScripts/WordClouds/WordCloudContainerPaid";
import { createItem, deleteItem } from "../../api/crud";
export default function Plays() {
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  async function createPlay(play) {
    const response = await createItem(play, "play");
    if (response.status >= 400) {
      console.log("Error creating play");
    } else {
      history.push(`/plays/${response.data.id}`);
    }
  }

  async function deletePlay(playId) {
    const response = await deleteItem(playId, "play");
    if (response.status >= 400) {
      console.log("Error deleting play");
    } else {
      history.push("/plays");
    }
  }

  function closeNewPlayForm() {
    history.push("/plays");
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
          <Switch>
            <Route
              path="/plays/:playId/character_breakdown"
              render={(props) => (
                <PlayWrapper {...props}>
                  <CharactersBreakdown />
                </PlayWrapper>
              )}
            />
            <Route
              path="/plays/new"
              render={(props) => (
                <NewPlay
                  {...props}
                  onFormClose={closeNewPlayForm}
                  onFormSubmit={handleCreateFormSubmit}
                />
              )}
            />
            <Route
              path="/plays/:playId/part_scripts"
              render={(props) => (
                <PlayWrapper {...props}>
                  <PartScriptsContainerPaid />
                </PlayWrapper>
              )}
            />
            <Route
              path="/plays/:playId/playscript"
              render={(props) => (
                <PlayWrapper {...props}>
                  <PlayScript />
                </PlayWrapper>
              )}
            />

            <Route
              path="/plays/:playId/text_breakdown"
              render={(props) => (
                <PlayWrapper {...props}>
                  <TextUnitBreakdown />
                </PlayWrapper>
              )}
            />

            <Route
              path="/plays/:playId/word_clouds"
              render={(props) => (
                <PlayWrapper {...props}>
                  <WordCloudContainerPaid />
                </PlayWrapper>
              )}
            />

            <Route
              path={`/plays/:playId`}
              render={(props) => (
                <PlayWrapper {...props}>
                  <PlayShow onDeleteClick={deletePlay} />
                </PlayWrapper>
              )}
            />
            <Route
              path="/plays/"
              component={PlaysList}
              onDeleteClick={deletePlay}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
