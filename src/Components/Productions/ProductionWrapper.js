import { useParams } from "react-router";
import ProductionShow from "./ProductionShow";
import { ProductionAuthProvider } from "../Contexts";
import { ProductionProvider } from "../../lib/productionState";

export default function ProductionWrapper({}) {
  const { productionId } = useParams();
  return (
    <ProductionAuthProvider productionId={productionId}>
      <ProductionProvider>
        <ProductionShow />
      </ProductionProvider>
    </ProductionAuthProvider>
  );
}
