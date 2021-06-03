// import SignIn from "./SignIn";
import { useMeState } from "../lib/meState";
//apply to any elements that are completely blocked from users that are not signed in
export default function ({ children }) {
  const { me } = useMeState();
  // if (!me) return <SignIn />;
  if (!me) return <div>You aren't signed in !</div>;
  return children;
}
