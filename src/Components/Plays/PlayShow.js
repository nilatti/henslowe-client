import LoadingModal from "../LoadingModal";
import { usePlayState } from "../../lib/playState";
import PlayProfileForAdmin from "./PlayProfileForAdmin";
import PlayProfileForVisitor from "./PlayProfileForVisitor";
import { useProductionAuthState } from "../Contexts";
import { Profile } from "../Styled";
export default function PlayShow({ onDeleteClick }) {
  const { loading, play, updatePlay } = usePlayState();
  const { role } = useProductionAuthState();
  if (loading || role == "unset") {
    return <LoadingModal displayText="Loading play" />;
  } else {
    console.log("role", role);
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
