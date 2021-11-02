import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import TheaterInfoTab from "../Theaters/TheaterInfoTab";
import { useSpaceAuthState } from "../Contexts";
import LoadingModal from "../LoadingModal";
import { ConflictStateProvider } from "../../lib/conflictState";
import ConflictsList from "../Conflicts/ConflictsList";
import { Profile } from "../Styled";
import SpaceProfileForAdmin from "./SpaceProfileForAdmin";
import SpaceProfileForVisitor from "./SpaceProfileForVisitor";

import SpaceAgreementFormForSpaces from "../SpaceAgreements/SpaceAgreementFormForSpaces";

import { SPACE_CONFLICT_REASONS } from "../../utils/hardcodedConstants";
import { getItem, updateServerItem } from "../../api/crud";
export default function SpaceShow() {
  const { role } = useSpaceAuthState();
  console.log("role", role);
  const { spaceId } = useParams();
  const [key, setKey] = useState();
  const [loading, setLoading] = useState(false);
  const [space, setSpace] = useState();
  const [theaterTabs, setTheaterTabs] = useState([]);
  useEffect(() => {
    if (space && space.theaters && space.theaters.length > 0) {
      let formattedTheaterTabs = space.theaters.map((theater) => (
        <Tab
          eventKey={`theater-${theater.id}`}
          title={theater.name}
          key={`theater-${theater.id}`}
        >
          <TheaterInfoTab theater={theater} />
        </Tab>
      ));
      setTheaterTabs(formattedTheaterTabs);
    }
  }, [JSON.stringify(space?.theaters)]);

  useEffect(async () => {
    setLoading(true);
    let response = await getItem(spaceId, "space");
    if (response.status >= 400) {
      console.log("error fetching space");
    } else {
      setSpace(response.data);
    }
    setLoading(false);
  }, []);

  function handleSelect(key) {
    setKey(key);
  }

  async function updateSpace(space) {
    let response = await updateServerItem(space, "space");
    if (response.status >= 400) {
      console.log("error updating space");
    } else {
      setSpace(response.data);
    }
  }
  if (loading || !space) {
    return <LoadingModal displayText="Loading space" />;
  } else {
    return (
      <Profile>
        {role === "theater_admin" ? (
          <SpaceProfileForAdmin space={space} updateSpace={updateSpace} />
        ) : (
          <SpaceProfileForVisitor space={space} />
        )}

        <hr />
        <div>
          <h2>Theaters</h2>
          {role === "theater_admin" && (
            <SpaceAgreementFormForSpaces
              space={space}
              isOpen={false}
              onFormSubmit={updateSpace}
            />
          )}

          <Tabs activeKey={key} onSelect={handleSelect} id="theater-info-tabs">
            {theaterTabs}
          </Tabs>
          <hr />
        </div>

        <h2>Space Scheduling</h2>

        <ConflictStateProvider
          parentId={space.id}
          parentType="space"
          propsConflicts={space.conflicts}
          propsConflictPatterns={space.conflict_patterns}
          conflictReasonsArray={SPACE_CONFLICT_REASONS}
          roles={[role]}
        >
          <ConflictsList />
        </ConflictStateProvider>
        <hr />
      </Profile>
    );
  }
}
