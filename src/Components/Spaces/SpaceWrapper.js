import { useParams } from "react-router";
import SpaceShow from "./SpaceShow.js";
import { SpaceAuthProvider } from "../Contexts.js";
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
