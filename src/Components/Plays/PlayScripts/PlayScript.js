//this is the container for play editing for PAID customers. It talks to the server
import { useEffect, useState } from "react";
import EditScript from "./EditScript";
import LoadingModal from "../../LoadingModal";
import { usePlayState } from "../../../lib/playState";

export default function PlayScript() {
  const { loadFullPlay, loading, play } = usePlayState();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    loadFullPlay();
  }, []);

  if (loading || !play.full) {
    return <LoadingModal displayText="Loading play text" />;
  }
  return (
    <EditScript
      characters={play.characters}
      linesPerMinute={play.production?.lines_per_minute}
      playSkeleton={play}
    />
  );
}
