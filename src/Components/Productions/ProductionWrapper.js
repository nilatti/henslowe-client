import { useParams } from "react-router";
import EditableProduction from "./EditableProduction";
import { ProductionAuthProvider } from "../Contexts";
import { ProductionProvider } from "../../lib/productionState";

export default function ProductionWrapper({}) {
  const { productionId } = useParams();
  return (
    <ProductionAuthProvider productionId={productionId}>
      <ProductionProvider>
        <EditableProduction />
      </ProductionProvider>
    </ProductionAuthProvider>
  );
}
