import { useEffect } from "react";
import { Link } from "react-router-dom";
import WordCloudContainer from "./WordCloudContainer.js";
import LoadingModal from "../../../LoadingModal.js";
import { usePlayState } from "../../../../lib/playState.js";

export default function WordCloudContainerPaid() {
  const { loadFullPlay, loading, play } = usePlayState();

  useEffect(() => {
    loadFullPlay();
  }, []);

  if (loading || !play.full) {
    return <LoadingModal displayText="Loading play" />;
  }

  return (
    <>
      <div>
        Make a wordcloud for <Link to={`/plays/${play.id}`}>{play.title}</Link>
      </div>
      <WordCloudContainer play={play} />
    </>
  );
}
