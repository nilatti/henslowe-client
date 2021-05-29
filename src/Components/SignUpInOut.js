import SignOut from "./SignOut";
import SignIn from "./SignIn";
import { useMeState } from "../lib/meState";

export default function SignUpInOut() {
  const { me, meName } = useMeState();
  return (
    <div>
      {me ? (
        <div>
          Welcome, {meName}!
          <SignOut />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
