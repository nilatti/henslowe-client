import { createContext, useContext, useEffect, useState } from "react";
import { getItem } from "../api/crud";
import { getPlaySkeleton, getPlayScript } from "../api/plays";
const PlayStateContext = createContext();
const PlayStateProvider = PlayStateContext.Provider;

function PlayProvider({ children }) {
  const [play, setPlay] = useState({});
  const [playSkeleton, setPlaySkeleton] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    if (play.id) {
      setLoading(true);
      let response = await getPlaySkeleton(play.id);
      if (response.status >= 400) {
        console.log("error!");
        setErrors((errors) => [...errors, "Error fetching play skeleton"]);
      } else {
        console.log(response.data);
        setPlaySkeleton(response.data);
      }
      setLoading(false);
    }
  }, [play]);
  //get play
  async function getPlay(playId) {
    if (playId) {
      console.log("get play called");
      setLoading(true);
      const response = await getPlayScript(playId);
      if (response.status >= 400) {
        console.log("error getting play");
      } else {
        setPlay(response.data);
      }
      setLoading(false);
    }
  }

  return (
    <PlayStateProvider
      value={{
        getPlay,
        loading,
        play,
        playSkeleton,
        setPlay,
      }}
    >
      {children}
    </PlayStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function usePlayState() {
  // We use a consumer here to access the local state
  const all = useContext(PlayStateContext);
  return all;
}
export { PlayProvider, usePlayState };
