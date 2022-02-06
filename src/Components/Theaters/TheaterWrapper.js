import { useParams } from "react-router";
import TheaterShow from "./TheaterShow.js";
import { TheaterAuthProvider } from "../Contexts.js";
// import { ProductionProvider } from "../../lib/productionState";

export default function TheaterWrapper({ onDeleteClick, onFormSubmit }) {
  const { theaterId } = useParams();
  return (
    <TheaterAuthProvider theaterId={theaterId}>
      {/* <ProductionProvider> */}
      <TheaterShow onDeleteClick={onDeleteClick} onFormSubmit={onFormSubmit} />
      {/* </ProductionProvider> */}
    </TheaterAuthProvider>
  );
}
