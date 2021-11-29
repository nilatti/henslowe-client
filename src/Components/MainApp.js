import FullAccessPage from "./FullAccessPage";
import PublicPage from "./PublicPage";
import { useMeState } from "../lib/meState";

export default function MainApp() {
  const { me } = useMeState();
  if (me?.email) {
    return <FullAccessPage />;
  } else {
    return <PublicPage />;
  }
}
