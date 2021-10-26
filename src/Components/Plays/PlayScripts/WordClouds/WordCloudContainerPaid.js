import { useEffect } from "react";
import WordCloudContainer from "./WordCloudContainer";
import LoadingModal from "../../../LoadingModal";
import { usePlayState } from "../../../../lib/playState";

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
      <div>Make a wordcloud for {play.title}</div>
      <WordCloudContainer play={play} />
    </>
  );
}
