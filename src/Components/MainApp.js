import FullAccessPage from "./FullAccessPage.js";
import PublicPage from "./PublicPage.js";
import { useMeState } from "../lib/meState.js";
import { ErrorProvider } from "../lib/errorState.js";

export default function MainApp() {
  const { me } = useMeState();
  if (me?.email) {
    return (
      <ErrorProvider>
        <FullAccessPage />
      </ErrorProvider>
    );
  } else {
    return (
      <ErrorProvider>
        <PublicPage />
      </ErrorProvider>
    );
  }
}
