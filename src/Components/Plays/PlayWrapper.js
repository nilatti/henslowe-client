import { SuperAuthProvider } from "../Contexts";
import { PlayProvider } from "../../lib/playState";

export default function PlayWrapper({ children }) {
  return (
    <SuperAuthProvider>
      <PlayProvider>{children}</PlayProvider>
    </SuperAuthProvider>
  );
}
