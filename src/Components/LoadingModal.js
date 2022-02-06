import { Spinner } from "./Loaders.js";
import Modal from "./Modal.js";

export default function LoadingModal({ displayText }) {
  return (
    <Modal>
      <h1>{displayText || "Loading!"}</h1>
      <Spinner />
    </Modal>
  );
}
