import { useParams } from "react-router";
import SpecializationShow from "./SpecializationShow";
import { SuperAuthProvider } from "../Contexts";

export default function SpecializationWrapper({ onDeleteClick }) {
  return (
    <SuperAuthProvider>
      <SpecializationShow onDeleteClick={onDeleteClick} />
    </SuperAuthProvider>
  );
}
