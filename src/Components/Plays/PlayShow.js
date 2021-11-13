import LoadingModal from "../LoadingModal";
import { usePlayState } from "../../lib/playState";
import { useSuperAuthState } from "../Contexts";
import PlayProfileForAdmin from "./PlayProfileForAdmin";
import PlayProfileForVisitor from "./PlayProfileForVisitor";
import { Profile } from "../Styled";
export default function PlayShow({ onDeleteClick }) {
  const { loading, play, updatePlay } = usePlayState();
  const { role } = useSuperAuthState();

  if (loading) {
    return <LoadingModal displayText="Loading play" />;
  } else {
    return (
      <Profile>
        {role === "superadmin" ? (
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
