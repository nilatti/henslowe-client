import { useParams } from "react-router";
import TheaterShow from "./TheaterShow";
import { TheaterAuthProvider } from "../Contexts";
// import { ProductionProvider } from "../../lib/productionState";

export default function TheaterWrapper({}) {
  const { theaterId } = useParams();
  return (
    <TheaterAuthProvider theaterId={theaterId}>
      {/* <ProductionProvider> */}
      <TheaterShow />
      {/* </ProductionProvider> */}
    </TheaterAuthProvider>
  );
}
