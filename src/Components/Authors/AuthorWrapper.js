import { useParams } from "react-router";
import AuthorShow from "./AuthorShow";
import { SuperAuthProvider } from "../Contexts";

export default function AuthorWrapper({ onDeleteClick }) {
  return (
    <SuperAuthProvider>
      <AuthorShow onDeleteClick={onDeleteClick} />
    </SuperAuthProvider>
  );
}
