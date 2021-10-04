import PrivatePage from "./PrivatePage";
import PublicPage from "./PublicPage";
import { useMeState } from "../lib/meState";

export default function MainApp() {
  const { me } = useMeState();
  return <>{me?.email ? <PrivatePage /> : <PublicPage />}</>;
}
