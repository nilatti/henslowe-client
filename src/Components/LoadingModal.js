import { Spinner } from "./Loaders";
import Modal from "./Modal";

export default function LoadingModal({ displayText }) {
  return (
    <Modal>
      <h1>{displayText || "Loading!"}</h1>
      <Spinner />
    </Modal>
  );
}
