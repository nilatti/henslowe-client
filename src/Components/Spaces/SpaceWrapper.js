import { useParams } from "react-router";
import SpaceShow from "./SpaceShow";
import { SpaceAuthProvider } from "../Contexts";
// import { ProductionProvider } from "../../lib/productionState";

export default function SpaceWrapper({}) {
  const { spaceId } = useParams();
  return (
    <SpaceAuthProvider spaceId={spaceId}>
      {/* <ProductionProvider> */}
      <SpaceShow />
      {/* </ProductionProvider> */}
    </SpaceAuthProvider>
  );
}
