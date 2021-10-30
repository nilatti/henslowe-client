import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

import CharacterInfoTab from "./CharacterInfoTab";
import NewCharacter from "./NewCharacter";
import LoadingModal from "../../LoadingModal";

import { usePlayState } from "../../../lib/playState";
export default function CharactersBreakdown() {
  const { charactersAll, loading, loadPlay, play } = usePlayState();
  const [characterTabs, setCharacterTabs] = useState([]);
  const [key, setKey] = useState();

  function handleSelect(key) {
    setKey(key);
  }
  useEffect(() => {
    loadPlay();
  }, []);

  useEffect(() => {
    if (charactersAll.length) {
      let workingCharacterTabs = charactersAll.map((character) => (
        <Tab
          eventKey={`character-${character.id}`}
          key={`character-${character.id}`}
          title={`${character.name || character.xml_id}`}
        >
          <CharacterInfoTab character={character} />
        </Tab>
      ));
      setCharacterTabs(workingCharacterTabs);
    } else {
      setCharacterTabs([]);
    }
  }, [charactersAll]);

  if (loading || !play.medium) {
    return <LoadingModal />;
  }
  return (
    <div>
      <div>
        <div>
          <h2>
            <Link to={`/plays/${play.id}`}>{play.title}</Link>
          </h2>
          {play.canonical && (
            <p>
              <em> Canonical Version</em>
            </p>
          )}
          {!!play.author && (
            <h3>
              by{" "}
              <Link to={`/authors/${play.author.id}`}>
                {" "}
                {play.author.first_name} {play.author.last_name}
              </Link>
            </h3>
          )}
        </div>
      </div>
      <div>
        <h2>Characters</h2>
      </div>
      <Tabs activeKey={key} onSelect={handleSelect} id="character-info-tabs">
        {characterTabs}
        <Tab
          eventKey={`new-character`}
          key={`new-character`}
          title={`Add New Character`}
        >
          <NewCharacter setKey={setKey} />
        </Tab>
      </Tabs>
    </div>
  );
}
