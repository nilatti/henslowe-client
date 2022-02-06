import LoadingModal from "../LoadingModal.js";
import { usePlayState } from "../../lib/playState.js";
import PlayProfileForAdmin from "./PlayProfileForAdmin.js";
import PlayProfileForVisitor from "./PlayProfileForVisitor.js";
import { useProductionAuthState } from "../Contexts.js";
import { Profile } from "../Styled.js";
export default function PlayShow({ onDeleteClick }) {
  const { loading, play, updatePlay } = usePlayState();
  const { role } = useProductionAuthState();
  if (loading || role == "unset") {
    return <LoadingModal displayText="Loading play" />;
  } else {
    return (
      <Profile>
        {role === "admin" ? (
          <PlayProfileForAdmin
            play={play}
            onDeleteClick={onDeleteClick}
            updatePlay={updatePlay}
          />
        ) : (
          <PlayProfileForVisitor play={play} />
        )}
      </Profile>
    );
  }
}
