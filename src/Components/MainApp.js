import FreeAccountPage from "./FreeAccountPage";
import FullAccessPage from "./FullAccessPage";
import PublicPage from "./PublicPage";
import { useMeState } from "../lib/meState";

export default function MainApp() {
  const { me } = useMeState();
  console.log(me.subscription_status);
  if (me && me.subscription_status == "active") {
    return <FullAccessPage />;
  } else if (me && me.email) {
    return <FreeAccountPage />;
  }
  return <PublicPage />;
}
