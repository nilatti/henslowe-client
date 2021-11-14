import _ from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../../../../api/jobs";
import LoadingModal from "../../../LoadingModal";
import PartScriptContainer from "./PartScriptContainer";
import { usePlayState } from "../../../../lib/playState";
import { ACTOR_SPECIALIZATION_ID } from "../../../../utils/hardcodedConstants";

export default function PartScriptsContainerPaid() {
  const { loadFullPlay, loading, play } = usePlayState();
  const [actors, setActors] = useState([]);
  const [loadingActors, setLoadingActors] = useState(true);

  useEffect(() => {
    loadFullPlay();
  }, []);

  useEffect(async () => {
    if (play.production_id) {
      setLoadingActors(true);
      let response = await getJobs({
        production_id: play.production_id,
        specialization_id: ACTOR_SPECIALIZATION_ID,
      });
      if (response.status >= 400) {
        console.log("error fetching actors");
      } else {
        let returnedActors = response.data.map((job) => job.user);
        let compactActors = returnedActors.filter((actor) => actor != null);
        let uniqActors = _.uniqBy(compactActors, "id");
        setActors(uniqActors);
      }
    }
    setLoadingActors(false);
  }, [play]);

  if (loading || !play.full || loadingActors) {
    return <LoadingModal displayText="Loading parts" />;
  }
  return (
    <>
      <div>
        Get part scripts for <Link to={`/plays/${play.id}`}>{play.title}</Link>
      </div>
      <PartScriptContainer actors={actors} play={play} />
    </>
  );
}
