import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

import ActInfoTab from "./ActInfoTab";
import LoadingModal from "../LoadingModal";
import { usePlayState } from "../../lib/playState";
export default function TextUnitBreakdown() {
  const { loading, loadPlay, play } = usePlayState();

  const [key, setKey] = useState();
  let actTabs;
  function handleSelect(key) {
    setKey(key);
  }
  useEffect(() => {
    loadPlay();
  }, []);

  if (loading || !play.medium) {
    return <LoadingModal />;
  }

  if (play.acts) {
    actTabs = play.acts.map((act) => (
      <Tab
        eventKey={`act-${act.id}`}
        key={`act-${act.id}`}
        title={`Act ${act.number}`}
      >
        <ActInfoTab act={act} />
      </Tab>
    ));
  } else {
    actTabs = <div>No acts found</div>;
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
      </Tabs>
    </div>
  );
}
