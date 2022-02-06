import AuthorShow from "./AuthorShow.js";
import { SuperAuthProvider } from "../Contexts.js";

export default function AuthorWrapper({ onDeleteClick }) {
  return (
    <SuperAuthProvider>
      <AuthorShow onDeleteClick={onDeleteClick} />
    </SuperAuthProvider>
  );
}
