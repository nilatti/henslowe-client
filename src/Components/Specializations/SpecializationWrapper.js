import { useParams } from "react-router";
import SpecializationShow from "./SpecializationShow.js";
import { SuperAuthProvider } from "../Contexts.js";

export default function SpecializationWrapper({ onDeleteClick }) {
  return (
    <SuperAuthProvider>
      <SpecializationShow onDeleteClick={onDeleteClick} />
    </SuperAuthProvider>
  );
}
