import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

import ActInfoTab from "./ActInfoTab.js";
import NewTextItem from "./NewTextItem.js";
import LoadingModal from "../LoadingModal.js";
import { usePlayState } from "../../lib/playState.js";
export default function TextUnitBreakdown() {
  const { acts, loading, loadPlay, play } = usePlayState();
  const [actTabs, setActTabs] = useState([]);
  const [lastAct, setLastAct] = useState();

  const [key, setKey] = useState();
  function handleSelect(key) {
    setKey(key);
  }
  useEffect(() => {
    loadPlay();
  }, [play]);

  useEffect(() => {
    if (acts.length) {
      let workingActTabs = acts.map((act) => (
        <Tab
          eventKey={`act-${act.id}`}
          key={`act-${act.id}`}
          title={`Act ${act.number}`}
        >
          <ActInfoTab act={act} />
        </Tab>
      ));
      setActTabs(workingActTabs);
      setLastAct(acts[acts.length - 1]);
    }
  }, [JSON.stringify(acts)]);

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
        <h2>Acts</h2>
      </div>
      <Tabs activeKey={key} onSelect={handleSelect} id="act-info-tabs">
        {actTabs}
        <Tab eventKey={`new-act`} key={`new-act`} title={`Add New Act`}>
          <NewTextItem
            number={lastAct?.number + 1 || 0}
            parentId={play.id}
            parentType="play"
            setKey={setKey}
            startPage={lastAct?.end_page || 0}
            type="act"
          />
        </Tab>
      </Tabs>
    </div>
  );
}
