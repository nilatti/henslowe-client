import { useParams } from "react-router";
import PlayShow from "./PlayShow";
// import { ProductionAuthProvider } from "../Contexts";
import { PlayProvider } from "../../lib/playState";

export default function ProductionWrapper({ children }) {
  const { playId } = useParams();
  return <PlayProvider>{children}</PlayProvider>;
}

{
  /* <ProductionAuthProvider productionId={productionId}>
      <ProductionProvider>
        <ProductionShow />
      </ProductionProvider>
    </ProductionAuthProvider> */
}
